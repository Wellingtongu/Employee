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
    [RoutePrefix("api/tbl_rh")]
    public class tbl_rhController : ApiController
    {
        private controlemployeesEntities db = new controlemployeesEntities();

        // GET: api/tbl_rh
        [Route("Gettbl_rh")]
        [HttpGet]
        public IQueryable<tbl_rh> Gettbl_rh()
        {
            return db.tbl_rh;
        }

        // GET: api/tbl_rh/5
        [ResponseType(typeof(tbl_rh))]
        public IHttpActionResult Gettbl_rh(int id)
        {
            tbl_rh tbl_rh = db.tbl_rh.Find(id);
            if (tbl_rh == null)
            {
                return NotFound();
            }

            return Ok(tbl_rh);
        }

        // PUT: api/tbl_rh/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Puttbl_rh(int id, tbl_rh tbl_rh)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tbl_rh.id)
            {
                return BadRequest();
            }

            db.Entry(tbl_rh).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!tbl_rhExists(id))
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

        // POST: api/tbl_rh
        [ResponseType(typeof(tbl_rh))]
        public IHttpActionResult Posttbl_rh(tbl_rh tbl_rh)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.tbl_rh.Add(tbl_rh);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = tbl_rh.id }, tbl_rh);
        }

        // DELETE: api/tbl_rh/5
        [ResponseType(typeof(tbl_rh))]
        public IHttpActionResult Deletetbl_rh(int id)
        {
            tbl_rh tbl_rh = db.tbl_rh.Find(id);
            if (tbl_rh == null)
            {
                return NotFound();
            }

            db.tbl_rh.Remove(tbl_rh);
            db.SaveChanges();

            return Ok(tbl_rh);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool tbl_rhExists(int id)
        {
            return db.tbl_rh.Count(e => e.id == id) > 0;
        }
    }
}