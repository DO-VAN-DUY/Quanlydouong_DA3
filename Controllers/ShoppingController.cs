using DA3DoUong.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DA3DoUong.Controllers
{
    public class ShoppingController : Controller
    {
        private QLBancaycanhEntities9 db = new QLBancaycanhEntities9();
        // GET: Shopping
        public ActionResult Cart()
        {
            return View();
        }
        public ActionResult CheckOut()
        {
            return View();
        }
        public JsonResult CreateHoaDon(Hoadonxuat model)
        {
            try
            {
                model.MaHD = Guid.NewGuid().ToString();
                if (model.CTXuats.Count > 0)
                {
                    foreach (var item in model.CTXuats)
                    {
                        item.MaHD = model.MaHD;
                    }
                }
                db.Hoadonxuats.Add(model);
                db.SaveChanges();
                return Json(new { ok = 1 }, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(new { ok = 0 }, JsonRequestBehavior.AllowGet);
            }

        }
    }
}