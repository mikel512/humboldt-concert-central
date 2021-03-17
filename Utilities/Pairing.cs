using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace fortress.core.Utilities
{
    public static class Pairing
    {
        public static KeyValuePair<string, object> Of(string key, object value)
        {
            return new KeyValuePair<string, object>(key, value);
        }
    }
}
