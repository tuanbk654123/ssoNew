using System.Runtime.Serialization;

namespace SsoGroup.Models
{
    public enum TypeLoginExtented
    {
        [EnumMember(Value = "none")]
        None = 0,

        [EnumMember(Value = "travele")]
        Travel = 1,
    }
}
