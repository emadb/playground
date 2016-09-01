def foldRight[A,B](as: List[A], z:B)(f: (A,B) => B): B = 
  as match {
    case Nil => z
    case ::(x, xs) => f(x, foldRight(xs, z)(f))
  }

def sum(ns: List[Int]) =
  foldRight(ns, 0)((x,y) => x + y)

def product(ns: List[Int]) =
  foldRight(ns, 1)((x,y) => x * y)

def length[A](ns: List[A]): Int = {
  foldRight(ns, 0)((x,y) => y + 1)  
}

def reverse[A](ns:List[A]) : List[A] = {
 foldRight(ns, List[A]())((x, y) => ::(y, x)) 
}

println(reverse(List(1,0,3,4,6,4,4,5)))
