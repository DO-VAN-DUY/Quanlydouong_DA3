using DA3DoUong.Models;
using System;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace Demo2.Controllers
{
    public class AdminController : Controller
    {
       
        private QLBancaycanhEntities9 db = new QLBancaycanhEntities9();
        public ActionResult Index()
        {
            var user = (Usess)Session["user"];
            if (user == null)
            {
                return RedirectToAction("Login", "Admin");
            }
            else
            {
                return View();
            }
        }
        public ActionResult Register()
        {
            return View();
        }
        public ActionResult AjaxRegister(Usess users)
        {
            if (ModelState.IsValid)
            {
                var check = db.Usesses.FirstOrDefault(s => s.Email == users.Email);
               
                if (check == null)
                {
                    db.Usesses.Add(users);
                    db.SaveChanges();

                    return Json(new { ok = 1 }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { ok = 0 }, JsonRequestBehavior.AllowGet);
                }


            }
            return View();

        }


        public ActionResult SanPham()
        {
            var user = (Usess)Session["user"];
            if (user == null)
            {
                return RedirectToAction("Login", "Admin");
            }
            else
            {
                return View();
            }
        }

        public ActionResult LogOut()
        {
            Session["user"] = null;
            return RedirectToAction("Login", "Admin");
        }
        public ActionResult Login()
        {
            return View();
        }
        public JsonResult AjaxLogin(string Email, string MatKhau)
        {
            try
            {
                var user = db.Usesses.SingleOrDefault(x => x.Email == Email && x.Matkhau == MatKhau);
                if (user != null)
                {
                    Session["user"] = user;
                }
                return Json(new { ok = 1 }, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(new { ok = 0 }, JsonRequestBehavior.AllowGet);
            }

        }

        public JsonResult GetDanhSach(int page, int limit)
        {
            
            var user = (Usess)Session["user"];
            if (user == null)
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }
            else
            {
                if (page == 0)
                    page = 1;

                if (limit == 0)
                    limit = int.MaxValue;

                var skip = (page - 1) * limit;
                
                var list = db.Sanphams.Select(a => new
                {
                   
                    MaSP = a.MASP,
                    TenSP = a.TenSP,
                    MaLoai = a.MALOAI,
                    Anh = a.AnhNV,
                    giacu = a.giacu,
                    Khuyenmai = a.Khuyenmai,
                    giamoi = a.giacu * (100 - a.Khuyenmai) / 100,
                    Mota = a.Mota,
                }).OrderBy(x => x.TenSP).Skip(skip).Take(limit).ToList();
                var total = db.Sanphams.Count();
                return Json(new { list = list, total = total }, JsonRequestBehavior.AllowGet);
            }

        }

        public JsonResult Upload()
        {
            try
            {
                HttpPostedFileBase file = Request.Files[0];
                if (file != null)
                {
                    //string path = Server.MapPath("~") + "assets\\images\\product\\medium-size";
                    string path = Server.MapPath("~") + "Content\\images\\product-detail\\cayuuthich";
                    string fileName = file.FileName;
                    if (!Directory.Exists(path))
                    {
                        Directory.CreateDirectory(path);
                    }
                    string fullPath = path + "\\" + fileName;
                    file.SaveAs(fullPath);
                    return Json("Content\\images\\product-detail\\cayuuthich" + fileName, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(null, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult UploadNV()
        {
            try
            {
                HttpPostedFileBase file = Request.Files[0];
                if (file != null)
                {
                    //string path = Server.MapPath("~") + "assets\\images\\product\\medium-size";
                    string path = Server.MapPath("~") + "Content\\images";
                    string fileName = file.FileName;
                    if (!Directory.Exists(path))
                    {
                        Directory.CreateDirectory(path);
                    }
                    string fullPath = path + "\\" + fileName;
                    file.SaveAs(fullPath);
                    return Json("Content\\images" + fileName, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(null, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult AjaxAddSanPham(Sanpham sp)
        {
            var user = (Usess)Session["user"];
            if (user == null)
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }
            else
            {
                try
                {
                    db.Sanphams.Add(sp);
                    db.SaveChanges();
                    return Json(1, JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {
                    return Json(null, JsonRequestBehavior.AllowGet);
                }
            }

        }

        public JsonResult AjaxUpdateSanPham(Sanpham sp)
        {
            var user = (Usess)Session["user"];
            if (user == null)
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }
            else
            {
                try
                {
                    var obj = db.Sanphams.SingleOrDefault(x => x.MASP == sp.MASP);

                    obj.TenSP = sp.TenSP;
                    obj.MALOAI = sp.MALOAI;
                    obj.AnhNV = sp.AnhNV;
                    obj.giacu = sp.giacu;
                    obj.Khuyenmai = sp.Khuyenmai;
                    obj.giamoi = sp.giacu * (100 - sp.Khuyenmai) / 100;
                    obj.Mota = sp.Mota;
                    db.SaveChanges();
                    return Json(1, JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {
                    return Json(null, JsonRequestBehavior.AllowGet);
                }
            }

        }

        public JsonResult AjaxXoaSanPham(Sanpham sp)
        {
            var user = (Usess)Session["user"];
            if (user == null)
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }
            else
            {
                try
                {
                    var obj = db.Sanphams.SingleOrDefault(x => x.MASP == sp.MASP);//tồn tại
                    db.Sanphams.Remove(obj);
                    db.SaveChanges();
                    return Json(1, JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {
                    return Json(null, JsonRequestBehavior.AllowGet);
                }
            }

        }
        /// <summary>
        /// /////////////////////////////////////   LOẠI SẢN PHẨM
        /// </summary>
        /// <returns></returns>
        public ActionResult LoaiSanPham()
        {
            var user = (Usess)Session["user"];
            if (user == null)
            {
                return RedirectToAction("Login", "Admin");
            }
            else
            {
                return View();
            }
        }
        public JsonResult GetDanhSachLoai(int page, int limit)
        {
            var user = (Usess)Session["user"];
            if (user == null)
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }
            else
            {
                if (page == 0)
                    page = 1;

                if (limit == 0)
                    limit = int.MaxValue;

                var skip = (page - 1) * limit;

                var listLoai = db.LoaiSPs.Select(b => new
                {
                    Maloai = b.MALOAI,
                    Tenloai = b.Tenloai,
                    Ghichu = b.Ghichu,
                }).OrderBy(x => x.Tenloai).Skip(skip).Take(limit).ToList();
                var totalloai = db.LoaiSPs.Count();
                return Json(new { list = listLoai, total = totalloai }, JsonRequestBehavior.AllowGet);
            }

        }
        public JsonResult AjaxAddLoaiSP(LoaiSP sp)
        {
            var user = (Usess)Session["user"];
            if (user == null)
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }
            else
            {
                try
                {
                   
                    db.LoaiSPs.Add(sp);
                    db.SaveChanges();
                    return Json(1, JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {
                    return Json(null, JsonRequestBehavior.AllowGet);
                }
            }

        }

        public JsonResult AjaxUpdateLoaiSP(LoaiSP sp)
        {
            var user = (Usess)Session["user"];
            if (user == null)
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }
            else
            {
                try
                {
                    var obj = db.LoaiSPs.SingleOrDefault(x => x.MALOAI == sp.MALOAI);
                    obj.Tenloai = sp.Tenloai;
                    obj.Ghichu = sp.Ghichu;
                    db.SaveChanges();
                    return Json(1, JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {
                    return Json(null, JsonRequestBehavior.AllowGet);
                }
            }

        }
        public JsonResult AjaxXoaLoaiSP(LoaiSP sp)
        {
            var user = (Usess)Session["user"];
            if (user == null)
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }
            else
            {
                try
                {
                    var obj = db.LoaiSPs.SingleOrDefault(x => x.MALOAI == sp.MALOAI);
                    db.LoaiSPs.Remove(obj);
                    db.SaveChanges();
                    return Json(1, JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {
                    return Json(null, JsonRequestBehavior.AllowGet);
                }
            }

        }
        /// <summary>
        /// ////////////////////NHÂN VIÊN
        /// </summary>
        /// <returns></returns>
        public ActionResult Nhanvien()
        {
            var user = (Usess)Session["user"];
            if (user == null)
            {
                return RedirectToAction("Login", "Admin");
            }
            else
            {
                return View();
            }
        }

        public JsonResult GetDanhSachNV(int page, int limit)
        {
            var user = (Usess)Session["user"];
            if (user == null)
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }
            else
            {
                if (page == 0)
                    page = 1;

                if (limit == 0)
                    limit = int.MaxValue;

                var skip = (page - 1) * limit;

                var listNV = db.Nhanviens.Select(a => new
                {
                    MaNV = a.MANV,
                    TenNV = a.TenNV,
                    SDTNV = a.SDTNV,
                    DiachiKH=a.DiachiKH,
                    AnhNV = a.AnhNV,
                    Email = a.Email,
                   
                }).OrderBy(x => x.TenNV).Skip(skip).Take(limit).ToList();
                var totalNV = db.Nhanviens.Count();
                return Json(new { list = listNV, total = totalNV }, JsonRequestBehavior.AllowGet);
            }

        }

     
        public JsonResult AjaxAddNV(Nhanvien sp)
        {
            var user = (Usess)Session["user"];
            if (user == null)
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }
            else
            {
                try
                {
                    db.Nhanviens.Add(sp);
                    db.SaveChanges();
                    return Json(1, JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {
                    return Json(null, JsonRequestBehavior.AllowGet);
                }
            }

        }

        public JsonResult AjaxUpdateNV(Nhanvien sp)
        {
            var user = (Usess)Session["user"];
            if (user == null)
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }
            else
            {
                try
                {
                    var obj = db.Nhanviens.SingleOrDefault(x => x.MANV== sp.MANV);

                    obj.TenNV = sp.TenNV;
                    obj.SDTNV = sp.SDTNV;
                    obj.DiachiKH = sp.DiachiKH;
                    obj.AnhNV= sp.AnhNV;
                    obj.Email= sp.Email;
                   
                    db.SaveChanges();
                    return Json(1, JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {
                    return Json(null, JsonRequestBehavior.AllowGet);
                }
            }

        }

        public JsonResult AjaxXoaNV(Nhanvien sp)
        {
            var user = (Usess)Session["user"];
            if (user == null)
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }
            else
            {
                try
                {
                    var obj = db.Nhanviens.SingleOrDefault(x => x.MANV == sp.MANV);
                    db.Nhanviens.Remove(obj);
                    db.SaveChanges();
                    return Json(1, JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {
                    return Json(null, JsonRequestBehavior.AllowGet);
                }
            }

        }
    
        /// <summary>
        /// //////////////////////////khách hàng
        /// </summary>
        /// <returns></returns>
        public ActionResult Khachhang()
        {
            var user = (Usess)Session["user"];
            if (user == null)
            {
                return RedirectToAction("Login", "Admin");
            }
            else
            {
                return View();
            }
        }
        public JsonResult GetDanhSachKH(int page, int limit)
        {
            var user = (Usess)Session["user"];
            if (user == null)
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }
            else
            {
                if (page == 0)
                    page = 1;

                if (limit == 0)
                    limit = int.MaxValue;

                var skip = (page - 1) * limit;

                var listKH = db.Khachhangs.Select(b => new
                {
                    MaKH = b.MAKH,
                    TenKH = b.TenKH,
                    DiachiKH = b.DiachiKH,
                    SDTKH = b.SDTKH,
                    Email = b.Email,

                }).OrderBy(x => x.TenKH).Skip(skip).Take(limit).ToList();
                var totalKH = db.Khachhangs.Count();
                return Json(new { list = listKH, total = totalKH }, JsonRequestBehavior.AllowGet);
            }

        }
        public JsonResult AjaxAddKH(Khachhang sp)
        {
            var user = (Usess)Session["user"];
            if (user == null)
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }
            else
            {
                try
                {
                  
                    db.Khachhangs.Add(sp);
                    db.SaveChanges();
                    return Json(1, JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {
                    return Json(null, JsonRequestBehavior.AllowGet);
                }
            }

        }

        public JsonResult AjaxUpdateKH(Khachhang sp)
        {
            var user = (Usess)Session["user"];
            if (user == null)
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }
            else
            {
                try
                {
                    var obj = db.Khachhangs.SingleOrDefault(x => x.MAKH == sp.MAKH);
                    obj.TenKH = sp.TenKH;
                    obj.DiachiKH = sp.DiachiKH;
                    obj.SDTKH = sp.SDTKH;
                    obj.Email = sp.Email;
                    db.SaveChanges();
                    return Json(1, JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {
                    return Json(null, JsonRequestBehavior.AllowGet);
                }
            }

        }
        public JsonResult AjaxXoaKH(Khachhang sp)
        {
            var user = (Usess)Session["user"];
            if (user == null)
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }
            else
            {
                try
                {
                    var obj = db.Khachhangs.SingleOrDefault(x => x.MAKH == sp.MAKH);
                    db.Khachhangs.Remove(obj);
                    db.SaveChanges();
                    return Json(1, JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {
                    return Json(null, JsonRequestBehavior.AllowGet);
                }
            }

        }
        /// <summary>
        /// ////////////////TIN TỨC LIÊN QUAN
        /// </summary>
        /// <returns></returns>
        public ActionResult Tintuclienquan()
        {
            var user = (Usess)Session["user"];
            if (user == null)
            {
                return RedirectToAction("Login", "Admin");
            }
            else
            {
                return View();
            }
        }
        public JsonResult GetDanhSachTLQ(int page, int limit)
        {
            var user = (Usess)Session["user"];
            if (user == null)
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }
            else
            {
                if (page == 0)
                    page = 1;

                if (limit == 0)
                    limit = int.MaxValue;

                var skip = (page - 1) * limit;

                var listtin = db.Tinchamsoccays.Select(b => new
                {
                    Matin = b.Matin,
                    MaNV = b.MaNV,
                    Tentin = b.Tentin,
                    Noidung = b.Noidung,
                    Anh = b.Anh,


                }).OrderBy(x => x.Tentin).Skip(skip).Take(limit).ToList();
                var totaltin = db.Tinchamsoccays.Count();
                return Json(new { list = listtin, total = totaltin }, JsonRequestBehavior.AllowGet);
            }

        }
        public JsonResult AjaxAddTin(Tinchamsoccay sp)
        {
            var user = (Usess)Session["user"];
            if (user == null)
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }
            else
            {
                try
                {
                    db.Tinchamsoccays.Add(sp);
                    db.SaveChanges();
                    return Json(1, JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {
                    return Json(null, JsonRequestBehavior.AllowGet);
                }
            }

        }

        public JsonResult AjaxUpdateTin(Tinchamsoccay sp)
        {
            var user = (Usess)Session["user"];
            if (user == null)
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }
            else
            {
                try
                {
                    var obj = db.Tinchamsoccays.SingleOrDefault(x => x.Matin == sp.Matin);
                    obj.Tentin = sp.Tentin;
                    obj.MaNV = sp.MaNV;
                    obj.Noidung = sp.Noidung;
                    obj.Anh = sp.Anh;
                    db.SaveChanges();
                    return Json(1, JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {
                    return Json(null, JsonRequestBehavior.AllowGet);
                }
            }

        }
        public JsonResult AjaxXoaTin(Tinchamsoccay sp)
        {
            var user = (Usess)Session["user"];
            if (user == null)
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }
            else
            {
                try
                {
                    var obj = db.Tinchamsoccays.SingleOrDefault(x => x.Matin == sp.Matin);
                    db.Tinchamsoccays.Remove(obj);
                    db.SaveChanges();
                    return Json(1, JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {
                    return Json(null, JsonRequestBehavior.AllowGet);
                }
            }

        }
        /// <summary>
        /// /////////////////HÓA ĐƠN
        /// </summary>
        /// <returns></returns>
        public ActionResult HoaDon()
        {
            var user = (Usess)Session["user"];
            if (user == null)
            {
                return RedirectToAction("Login", "Admin");
            }
            else
            {
                return View();
            }
        }
        public JsonResult GetDanhSachHD(int page, int limit)
        {
            var user = (Usess)Session["user"];
            if (user == null)
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }
            else
            {
                if (page == 0)
                    page = 1;

                if (limit == 0)
                    limit = int.MaxValue;

                var skip = (page - 1) * limit;

                var listhd = db.Hoadonxuats.Select(b => new
                {
                    MaHD = b.MaHD,
                    Hoten = b.Hoten,
                    NgaylapHD = b.NgaylapHD,
                    Diachi = b.Diachi,


                }).OrderBy(x => x.Hoten).Skip(skip).Take(limit).ToList();
                var totalhd = db.Hoadonxuats.Count();
                return Json(new { list = listhd, total = totalhd }, JsonRequestBehavior.AllowGet);
            }

        }
        public JsonResult AjaxAddHD(Hoadonxuat sp)
        {
            var user = (Usess)Session["user"];
            if (user == null)
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }
            else
            {
                try
                {
                    db.Hoadonxuats.Add(sp);
                    db.SaveChanges();
                    return Json(1, JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {
                    return Json(null, JsonRequestBehavior.AllowGet);
                }
            }

        }

        public JsonResult AjaxUpdateHD(Hoadonxuat sp)
        {
            var user = (Usess)Session["user"];
            if (user == null)
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }
            else
            {
                try
                {
                    var obj = db.Hoadonxuats.SingleOrDefault(x => x.MaHD == sp.MaHD);
                    obj.Hoten = sp.Hoten;
                    obj.NgaylapHD = sp.NgaylapHD;
                    obj.Diachi = sp.Diachi;
                    db.SaveChanges();
                    return Json(1, JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {
                    return Json(null, JsonRequestBehavior.AllowGet);
                }
            }

        }
        public JsonResult AjaxXoaHD(Hoadonxuat sp)
        {
            var user = (Usess)Session["user"];
            if (user == null)
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }
            else
            {
                try
                {
                    var obj = db.Hoadonxuats.SingleOrDefault(x => x.MaHD == sp.MaHD);
                    db.Hoadonxuats.Remove(obj);
                    db.SaveChanges();
                    return Json(1, JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {
                    return Json(null, JsonRequestBehavior.AllowGet);
                }
            }

        }
        /// <summary>
        /// //////////////////////////Chi tiết Hóa Đơn
        /// </summary>
        /// <returns></returns>
        public ActionResult CTHD()
        {
            var user = (Usess)Session["user"];
            if (user == null)
            {
                return RedirectToAction("Login", "Admin");
            }
            else
            {
                return View();
            }
        }
        public JsonResult GetDanhSachCTHD(int page, int limit)
        {
            var user = (Usess)Session["user"];
            if (user == null)
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }
            else
            {
                if (page == 0)
                    page = 1;

                if (limit == 0)
                    limit = int.MaxValue;

                var skip = (page - 1) * limit;

                var listCTHD = db.CTXuats.Select(b => new
                {
                    MaCTB = b.MaCTB,
                    MaHD = b.MaHD,
                    MaSP = b.MaSP,
                    Soluong= b.Soluong,
                   

                }).OrderBy(x => x.MaHD).Skip(skip).Take(limit).ToList();
                var totalCTHD = db.CTXuats.Count();
                return Json(new { list = listCTHD, total = totalCTHD }, JsonRequestBehavior.AllowGet);
            }

        }
        public JsonResult AjaxAddCTHD(CTXuat sp)
        {
            var user = (Usess)Session["user"];
            if (user == null)
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }
            else
            {
                try
                {
                    db.CTXuats.Add(sp);
                    db.SaveChanges();
                    return Json(1, JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {
                    return Json(null, JsonRequestBehavior.AllowGet);
                }
            }

        }

        public JsonResult AjaxUpdateCTHD(CTXuat sp)
        {
            var user = (Usess)Session["user"];
            if (user == null)
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }
            else
            {
                try
                {
                    var obj = db.CTXuats.SingleOrDefault(x => x.MaCTB == sp.MaCTB);
                    obj.MaCTB = sp.MaCTB;
                    obj.MaHD = sp.MaHD;
                    obj.MaSP= sp.MaSP;
                    obj.Soluong = sp.Soluong;
                    db.SaveChanges();
                    return Json(1, JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {
                    return Json(null, JsonRequestBehavior.AllowGet);
                }
            }

        }
        public JsonResult AjaxXoaCTHD(CTXuat sp)
        {
            var user = (Usess)Session["user"];
            if (user == null)
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }
            else
            {
                try
                {
                    var obj = db.CTXuats.SingleOrDefault(x => x.MaCTB == sp.MaCTB);
                    db.CTXuats.Remove(obj);
                    db.SaveChanges();
                    return Json(1, JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {
                    return Json(null, JsonRequestBehavior.AllowGet);
                }
            }

        }
        /// <summary>
        /// ////////////LOGIN
        /// </summary>
        /// <returns></returns>
        public ActionResult QLlogin()
        {
            var user = (Usess)Session["user"];
            if (user == null)
            {
                return RedirectToAction("Login", "Admin");
            }
            else
            {
                return View();
            }
        }
        public JsonResult GetDanhSachLogin(int page, int limit)
        {
            var user = (Usess)Session["user"];
            if (user == null)
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }
            else
            {
                if (page == 0)
                    page = 1;

                if (limit == 0)
                    limit = int.MaxValue;

                var skip = (page - 1) * limit;

                var listus = db.Usesses.Select(b => new
                {
                    MaND = b.MaNguoiDung,
                    Taikhoan = b.Taikhoan,
                    Matkhau = b.Matkhau,
                    Email = b.Email,

                }).OrderBy(x => x.Taikhoan).Skip(skip).Take(limit).ToList();
                var totalus = db.Usesses.Count();
                return Json(new { list = listus, total = totalus }, JsonRequestBehavior.AllowGet);
            }

        }
        public JsonResult AjaxAddUS(Usess sp)
        {
            var user = (Usess)Session["user"];
            if (user == null)
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }
            else
            {
                try
                {
                    sp.MaNguoiDung ++;
                    db.Usesses.Add(sp);
                    db.SaveChanges();
                    return Json(1, JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {
                    return Json(null, JsonRequestBehavior.AllowGet);
                }
            }

        }

        public JsonResult AjaxUpdateUS(Usess sp)
        {
            var user = (Usess)Session["user"];
           
            if (user == null)
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }
            else
            {
                try
                {
                    var obj = db.Usesses.SingleOrDefault(x => x.MaNguoiDung == sp.MaNguoiDung);
                   
                    obj.Taikhoan = sp.Taikhoan;
                    obj.Matkhau = sp.Matkhau;
                    obj.Email = sp.Email;
                    db.SaveChanges();
                    return Json(1, JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {
                    return Json(null, JsonRequestBehavior.AllowGet);
                }
            }

        }
        public JsonResult AjaxXoaTaikhoan(Usess sp)
        {
            var user = (Usess)Session["user"];
            if (user == null)
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }
            else
            {
                try
                {
                    var obj = db.Usesses.SingleOrDefault(x => x.MaNguoiDung==sp.MaNguoiDung);
                    db.Usesses.Remove(obj);
                    db.SaveChanges();
                    return Json(1, JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {
                    return Json(null, JsonRequestBehavior.AllowGet);
                }
            }

        }
        
    }
}

