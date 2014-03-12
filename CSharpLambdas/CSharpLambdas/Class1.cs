using System;
using System.Reflection.Emit;
using System.Security.Cryptography.X509Certificates;
using NUnit.Framework;

namespace CSharpLambdas
{
    public class L
    {
        public static dynamic Element = new Func<dynamic, dynamic>(x => x);
        
        // ZERO  = -> p { -> x {       x    } }
        public static dynamic Zero = new Func<dynamic, dynamic>(p => new Func<dynamic, dynamic>(x => x));
        
        // ONE   = -> p { -> x {     p[x]   } }
        public static dynamic One = new Func<dynamic, dynamic, dynamic>((p,x) => p(x));
        //public static dynamic One = new Func<dynamic, dynamic>(p => p(new Func<dynamic, dynamic>(x => x)));

        // TWO   = -> p { -> x {   p[p[x]]  } }
        public static dynamic Two = new Func<dynamic, dynamic, dynamic, dynamic>((p, x, y) => p(x(y)));
    }

    [TestFixture]
    public class LambdasTests
    {
        private int ToInteger(dynamic proc)
        {
            //  proc[-> n { n + 1 }][0]
            Func<dynamic, dynamic> func = n => n + 1;
            return proc(func);
        }


        [Test]
        public void Zero()
        {
            Assert.AreEqual(0, ToInteger(L.Zero));
        }

        [Test]
        public void One()
        {
            Assert.AreEqual(1, ToInteger(L.One));
        }

        [Test]
        public void Two()
        {
            Assert.AreEqual(2, ToInteger(L.Two));
        }
    }
}
