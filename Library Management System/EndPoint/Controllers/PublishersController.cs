using EndPoint.ModelDto;
using EndPoint.Models.Services;
using Microsoft.AspNetCore.Mvc;

namespace EndPoint.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PublishersController : ControllerBase
    {
        private readonly IPublisherService _publisherService;

        public PublishersController(IPublisherService publisherService)
        {
            _publisherService = publisherService;
        }

        [HttpGet]
        public async Task<IActionResult> List()
        {
            var result = await _publisherService.Get();

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Save(PublisherDto publisher)
        {
            await _publisherService.Save(publisher);

            return Created("", "");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _publisherService.Delete(id);

            return Ok();
        }
    }
}
