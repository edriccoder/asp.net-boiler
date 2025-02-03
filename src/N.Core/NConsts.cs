using N.Debugging;

namespace N
{
    public class NConsts
    {
        public const string LocalizationSourceName = "N";

        public const string ConnectionStringName = "Default";

        public const bool MultiTenancyEnabled = true;


        /// <summary>
        /// Default pass phrase for SimpleStringCipher decrypt/encrypt operations
        /// </summary>
        public static readonly string DefaultPassPhrase =
            DebugHelper.IsDebug ? "gsKxGZ012HLL3MI5" : "ec9a576be0224f07b629b74ed6c91d90";
    }
}
