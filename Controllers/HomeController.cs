using DA3DoUong.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Demo2.Controllers
{
    public class HomeController : Controller
    {
       
        private QLBancaycanhEntities9 db = new QLBancaycanhEntities9();
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Tuvan()
        {
            return View();
        }
        public ActionResult lienhe()
        {
            return View();
        }
        public JsonResult Gettuvan()
        {
            var list = db.Tinchamsoccays.Select(a => new
            {
                Matv = a.Matin,
                Tentin = a.Tentin,
                Anh = a.Anh,
                Noidung = a.Noidung,
                Manv = a.MaNV,
            }).ToList();
            return Json(list, JsonRequestBehavior.AllowGet);

        }

        public JsonResult GetLoaiSP()
        {
            var list = db.LoaiSPs.Select(a => new
            {
                MaLoai = a.MALOAI,
                TenLoai = a.Tenloai,
                Ghichu= a.Ghichu,
            }).ToList();
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetSPMoi()
        {
            var list = db.Sanphams.Select(a => new
            {
                MaSP = a.MASP,
                MaLoai=a.MALOAI,
                TenSP = a.TenSP,
                Anh = a.AnhNV,
                Gia = a.giacu,
                GiaKM = a.giacu * (100 - a.Khuyenmai) / 100,
                Khuyenmai =a.Khuyenmai,
                Mota = a.Mota
            }).ToList();
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public ActionResult gioithieu()
        {
            return View();
        }
        public JsonResult GetSPGG()
        {
            var list = db.Sanphams.Select(a => new
            {
                MaSP = a.MASP,
                TenSP = a.TenSP,
                MaLoai = a.MALOAI,
                Anh = a.AnhNV,
                Gia = a.giacu,
                Khuyenmai = a.Khuyenmai,
                GiaKM = a.giacu * (100 - a.Khuyenmai)/100,
                Mota = a.Mota
            }).Where(x => x.Khuyenmai>0).ToList();
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetSPGC()
        {
            var list = db.Sanphams.Select(a => new
            {
                MaSP = a.MASP,
                TenSP = a.TenSP,
                MaLoai = a.MALOAI,
                Anh = a.AnhNV,
                Gia = a.giacu,
                Khuyenmai = a.Khuyenmai,
                GiaKM = a.giacu * (100 - a.Khuyenmai)/100,
                Mota = a.Mota
            }).Where(x => x.Gia > 180000).ToList();
            return Json(list, JsonRequestBehavior.AllowGet);
        }
    }
}