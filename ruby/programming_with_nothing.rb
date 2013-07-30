#!/usr/bin/ruby
ZERO  = -> p { -> x {       x    } }
ONE   = -> p { -> x {     p[x]   } }
TWO   = -> p { -> x {   p[p[x]]  } }
THREE = -> p { -> x { p[p[p[x]]] } }

def one(proc, x)
  proc[x]
end

def to_integer(proc)
  proc[-> n { n + 1 }][0]
end

p one(ZERO, 0).call(0)