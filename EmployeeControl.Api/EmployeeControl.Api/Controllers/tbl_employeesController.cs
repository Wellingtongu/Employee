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

    [RoutePrefix("api/tbl_employees")]
    public class tbl_employeesController : ApiController
    {
        private controlemployeesEntities db = new controlemployeesEntities();

        // GET: api/tbl_employees
        [Route("Gettbl_employees")]
        [HttpGet]
        public IQueryable<tbl_employees> Gettbl_employees()
        {
            return db.tbl_employees;
        }

        // GET: api/tbl_employees/5
        [Route("Gettbl_employees")]
        [HttpGet]
        [ResponseType(typeof(tbl_employees))]
        public IHttpActionResult Gettbl_employees(int id)
        {
            tbl_employees tbl_employees = db.tbl_employees.Find(id);
            if (tbl_employees == null)
            {
                return NotFound();
            }

            return Ok(tbl_employees);
        }

        // PUT: api/tbl_employees/5

        [Route("Puttbl_employees")]
        [HttpPut]
        [ResponseType(typeof(void))]
        public IHttpActionResult Puttbl_employees(int id, tbl_employees tbl_employees)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tbl_employees.id)
            {
                return BadRequest();
            }

            db.Entry(tbl_employees).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!tbl_employeesExists(id))
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


        [Route("Posttbl_employees")]
        [HttpPost]
        // POST: api/tbl_employees
        [ResponseType(typeof(tbl_employees))]
        public IHttpActionResult Posttbl_employees(tbl_employees tbl_employees)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.tbl_employees.Add(tbl_employees);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = tbl_employees.id }, tbl_employees);
        }

        // DELETE: api/tbl_employees/5
        [Route("Deletetbl_employees")]
        [HttpDelete]
        [ResponseType(typeof(tbl_employees))]
        public IHttpActionResult Deletetbl_employees(int id)
        {
            tbl_employees tbl_employees = db.tbl_employees.Find(id);
            if (tbl_employees == null)
            {
                return NotFound();
            }

            db.tbl_employees.Remove(tbl_employees);
            db.SaveChanges();

            return Ok(tbl_employees);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool tbl_employeesExists(int id)
        {
            return db.tbl_employees.Count(e => e.id == id) > 0;
        }
    }
}