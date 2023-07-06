using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DA3DoUong.Models;

namespace DA3DoUong.Controllers
{
    public class TimkiemController : Controller
    {
        // GET: Timkiem
        QLBancaycanhEntities9 db = new QLBancaycanhEntities9();
        public ActionResult KQTimkiem(string sTuKhoa)
        {
            //tìm theo ten
            var listSP = db.Sanphams.Where(n => n.TenSP.Contains(sTuKhoa));

            return View(listSP.OrderBy(n=>n.TenSP));
        }
    }
}