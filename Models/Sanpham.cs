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
    
    public partial class Sanpham
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Sanpham()
        {
            this.CTXuats = new HashSet<CTXuat>();
        }
    
        public int MASP { get; set; }
        public string TenSP { get; set; }
        public string Mota { get; set; }
        public Nullable<int> Khuyenmai { get; set; }
        public Nullable<int> giamoi { get; set; }
        public Nullable<int> giacu { get; set; }
        public Nullable<int> MALOAI { get; set; }
        public string AnhNV { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CTXuat> CTXuats { get; set; }
        public virtual LoaiSP LoaiSP { get; set; }
    }
}
