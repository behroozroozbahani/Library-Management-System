using EndPoint.ModelDto;
using EndPoint.Models.Services;
using Microsoft.AspNetCore.Mvc;

namespace EndPoint.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class GenresController : ControllerBase
    {
        private readonly IGenreService _genreService;

        public GenresController(IGenreService genreService)
        {
            _genreService = genreService;
        }

        [HttpGet]
        public async Task<IActionResult> List()
        {
            var result = await _genreService.Get();

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Save(GenreDto genre)
        {
            await _genreService.Save(genre);

            return Created("", "");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _genreService.Delete(id);

            return Ok();
        }
    }
}
