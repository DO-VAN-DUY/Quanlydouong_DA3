//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DA3DoUong.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class HDNN
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public HDNN()
        {
            this.CTHDNs = new HashSet<CTHDN>();
        }
    
        public int MaHDN { get; set; }
        public Nullable<int> MaNV { get; set; }
        public string Diachinhap { get; set; }
        public Nullable<System.DateTime> Ngaynhap { get; set; }
        public Nullable<System.DateTime> NgaylapHD { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CTHDN> CTHDNs { get; set; }
        public virtual Nhanvien Nhanvien { get; set; }
    }
}