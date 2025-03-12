using EndPoint.ModelDto;
using EndPoint.Models.Services;
using Microsoft.AspNetCore.Mvc;

namespace EndPoint.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly IBookService _bookService;

        public BooksController(IBookService bookService)
        {
            _bookService = bookService;
        }

        [HttpGet]
        public async Task<IActionResult> List()
        {
            var result = await _bookService.Get();

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Save(BookDto book)
        {
            await _bookService.Save(book);

            return Created("", "");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _bookService.Delete(id);

            return Ok();
        }
    }
}