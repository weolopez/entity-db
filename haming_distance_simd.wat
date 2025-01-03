(module
  (import "env" "log" (func $log (param i32))) ;; Import a logging function
  (memory (export "memory") 1) ;; Define and export memory

  (func $hamming_distance (param $ptrA i32) (param $ptrB i32) (param $len i32) (result i32)
    (local $dist i32)
    (local.set $dist (i32.const 0)) ;; Initialize distance

    (block $exit ;; Define a breakable block for the loop
      (loop $loop ;; Start loop with a label
        (if (i32.eqz (local.get $len)) ;; Break if length is 0
          (br $exit)
        )

        ;; Log the current pointer
        (call $log (local.get $ptrA))

        ;; XOR the vectors and calculate popcount
        (local.set $dist
          (i32.add
            (local.get $dist)
            (i32.add
              (i32.popcnt (i32x4.extract_lane 0
                (v128.xor
                  (v128.load (local.get $ptrA))
                  (v128.load (local.get $ptrB))
                )
              ))
              (i32.add
                (i32.popcnt (i32x4.extract_lane 1
                  (v128.xor
                    (v128.load (local.get $ptrA))
                    (v128.load (local.get $ptrB))
                  )
                ))
                (i32.add
                  (i32.popcnt (i32x4.extract_lane 2
                    (v128.xor
                      (v128.load (local.get $ptrA))
                      (v128.load (local.get $ptrB))
                    )
                  ))
                  (i32.popcnt (i32x4.extract_lane 3
                    (v128.xor
                      (v128.load (local.get $ptrA))
                      (v128.load (local.get $ptrB))
                    )
                  ))
                )
              )
            )
          )
        )

        ;; Advance pointers by 16 bytes (128 bits)
        (local.set $ptrA (i32.add (local.get $ptrA) (i32.const 16)))
        (local.set $ptrB (i32.add (local.get $ptrB) (i32.const 16)))
        (local.set $len (i32.sub (local.get $len) (i32.const 16)))

        ;; Continue loop
        (br $loop)
      )
    )
    (local.get $dist) ;; Return the distance
  )
  (export "hamming_distance" (func $hamming_distance))
)
