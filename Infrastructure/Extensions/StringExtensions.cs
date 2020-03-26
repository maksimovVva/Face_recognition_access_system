using System;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;

namespace Infrastructure.Extensions
{
    public static class StringExtensions
    {
        public static string Truncate(this string source, int length, string end = "")
        {
            return source.Length <= length ? source : source.Substring(0, length) + end;
        }

        public static string SmartTruncate(this string source, int length, string end = "")
        {
            if (source.Length <= length) return source;

            var sb = new StringBuilder();
            var lengthByChars = length - 1;
            for (int i = 0; i < source.Length; i++)
            {
                var ch = source[i];
                if (lengthByChars <= i && (char.IsPunctuation(ch) || char.IsSeparator(ch))) break;
                sb.Append(ch);
            }

            return sb.Append(end).ToString();
        }

        public static string RemoveHtmlTagsExcept(this string source, params string[] except)
        {
            return Regex.Replace(source, @"<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;",
                match => except.Contains(match.Value) ? match.Value : string.Empty).Trim();
        }

        public static Guid? BuildGuid(this string source, Encoding encoding = null)
        {
            if (string.IsNullOrWhiteSpace(source)) return null;
            if (encoding == null) encoding = Encoding.UTF8;

            byte[] bytes = encoding.GetBytes(source);

            using (MD5 md5 = MD5.Create())
            {
                bytes = md5.ComputeHash(bytes);
            }

            return new Guid(bytes);
        }

        public static string WrapBy(this string source, string wrapper)
        {
            var sb = new StringBuilder(source);
            sb.Insert(0, wrapper);
            sb.Append(wrapper);
            return sb.ToString();
        }

        public static string FromByteArrayToString(this object source)
        {
            var array = source as byte[];

            return array == null ? null : Encoding.UTF8.GetString((byte[])source);
        }

        public static bool HasMoreThanWords(this string source, int count)
        {
            var regex = new Regex(@"^(\s*)([^\s]+\s+){" + (count + 1) + @"}([^\s]+)");
            var result = regex.IsMatch(source);

            return result;
        }

        public static string PrepareSearchContext(this string content)
        {
            var reservedSymbols = new[] { "\\", "+", "-", "=", "&", "||", "!", "(", ")", "{", "}", "[", "]", "^", "\"", "~", "*", "?", ":", "/", "|", "@", "$", "%", "`", "_", "#", " lt ", "<br>", "  " };

            content = content.SmartTruncate(500);
            content = reservedSymbols.Aggregate(content, (result, reserved) => result.Replace(reserved, " "));

            return string.Concat(content.Select(s => char.IsPunctuation(s) ? ' ' : s));
        }

        public static int? ToNullableInt(this string source)
        {
            int value;

            if (int.TryParse(source, out value))
                return value;

            return null;
        }
    }
}
