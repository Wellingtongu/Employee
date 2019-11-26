using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using EmployeeControl.Api.Models;

namespace EmployeeControl.Api.Controllers
{
    [RoutePrefix("api/tbl_admin")]
    public class tbl_adminController : ApiController
    {
        private controlemployeesEntities db = new controlemployeesEntities();

        // GET: api/tbl_admin
        [Route("Gettbl_all")]
        [HttpGet]
        public IQueryable<tbl_admin> Gettbl_all()
        {
            return db.tbl_admin;
        }

        // GET: api/tbl_admin/5
        [Route("Gettbl_admin")]
        [HttpGet]
        [ResponseType(typeof(tbl_admin))]
        public IHttpActionResult Gettbl_admin(int id)
        {
            tbl_admin tbl_admin = db.tbl_admin.Find(id);
            if (tbl_admin == null)
            {
                return NotFound();
            }

            return Ok(tbl_admin);
        }

        // PUT: api/tbl_admin/5
        [Route("Puttbl_admin")]
        [HttpPut]
        [ResponseType(typeof(void))]
        public IHttpActionResult Puttbl_admin(int id, tbl_admin tbl_admin)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tbl_admin.id)
            {
                return BadRequest();
            }

            db.Entry(tbl_admin).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!tbl_adminExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/tbl_admin
        [Route("Posttbl_admin")]
        [HttpPost]
        [ResponseType(typeof(tbl_admin))]
        public IHttpActionResult Posttbl_admin(tbl_admin tbl_admin)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.tbl_admin.Add(tbl_admin);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = tbl_admin.id }, tbl_admin);
        }

        // DELETE: api/tbl_admin/5
        [ResponseType(typeof(tbl_admin))]
        public IHttpActionResult Deletetbl_admin(int id)
        {
            tbl_admin tbl_admin = db.tbl_admin.Find(id);
            if (tbl_admin == null)
            {
                return NotFound();
            }

            db.tbl_admin.Remove(tbl_admin);
            db.SaveChanges();

            return Ok(tbl_admin);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool tbl_adminExists(int id)
        {
            return db.tbl_admin.Count(e => e.id == id) > 0;
        }
    }
}