using DA3DoUong.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Demo2.Controllers
{
    public class SanPhamController : Controller
    {

        private QLBancaycanhEntities9 db = new QLBancaycanhEntities9();
        public ActionResult DanhSach(string MaLoai)
        {
            ViewBag.MaLoai = MaLoai;
            return View();
        }
        // GET: SanPham
        public ActionResult Chitiet(string MaSP)
        {
            ViewBag.MaSP = MaSP;
            return View();
        }
        public JsonResult GetChiTiet(int MaSP)
        {
            var obj = db.Sanphams.Select(a => new
            {
                MaSP = a.MASP,
                TenSP = a.TenSP,
                MaLoai=a.MALOAI,
                Anh = a.AnhNV,
                Gia = a.giacu,
                Khuyenmai = a.Khuyenmai,
                GiaKM = a.giacu * (100 - a.Khuyenmai) / 100,
                MoTa = a.Mota,
                listSPCungLoai = db.Sanphams.Select(b => new
                {
                    MaSP = b.MASP,
                    MaLoai=b.MALOAI,
                    TenSP = b.TenSP,
                    Anh = b.AnhNV,
                    Gia = b.giacu,
                    Khuyenmai = a.Khuyenmai,
                    GiaKM = a.giacu * (100 - a.Khuyenmai) / 100,
                    MoTa = b.Mota
                }).Where(x => x.MaLoai == a.MALOAI).OrderByDescending(x => x.MaSP).Take(10).ToList()
        }).SingleOrDefault(x => x.MaSP == MaSP);
            return Json(obj, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetDanhSach(int MaLoai,int page, int limit)
        {
            if (page == 0)
                page = 1;

            if (limit == 0)
                limit = int.MaxValue;

            var skip = (page - 1) * limit;

            var list = db.Sanphams.Where(x => x.MALOAI == MaLoai).Select(a => new
            {
                MaSP = a.MASP,
                MaLoai = a.MALOAI,
                TenSP = a.TenSP,
                Anh = a.AnhNV,
                Gia = a.giacu,
                Khuyenmai = a.Khuyenmai,
                GiaKM = a.giamoi,
                MoTa = a.Mota
            }).OrderBy(x=>x.TenSP).Skip(skip).Take(limit).ToList();
            var total = db.Sanphams.Where(x => x.MALOAI == MaLoai).Count();
            return Json(new { list = list, total = total }, JsonRequestBehavior.AllowGet);
        }
    }
}