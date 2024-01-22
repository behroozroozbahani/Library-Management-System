using EndPoint.ModelDto;
using EndPoint.Models.Services;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace EndPoint.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AuthorsController : ControllerBase
    {
        private readonly IAuthorService _authorService;

        public AuthorsController(IAuthorService authorService)
        {
            _authorService = authorService;
        }

        [HttpGet]
        public async Task<IActionResult> List()
        {
            var result = await _authorService.Get();

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Save(AuthorDto author)
        {
            await _authorService.Save(author);

            return Created("", "");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _authorService.Delete(id);

            return Ok();
        }
    }
}