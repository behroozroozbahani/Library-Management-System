using EndPoint.ModelDto;
using EndPoint.Models.DBContext;
using Microsoft.EntityFrameworkCore;

namespace EndPoint.Models.Services
{
    public interface IPublisherService
    {
        Task<List<PublisherDto>> Get();
        Task<PublisherDto> Save(PublisherDto publisherDto);
        Task<PublisherDto> Delete(int id);
    }

    public class PublisherService : IPublisherService
    {
        private readonly DataBaseContext _context;

        public PublisherService(DataBaseContext context)
        {
            _context = context;
        }

        public async Task<List<PublisherDto>> Get()
        {
            var result = await _context.Publishers.Select(x => new PublisherDto()
            {
                Id = x.Id,
                Name = x.Name,
                Address = x.Address,
                Phone = x.Phone,

            }).ToListAsync();

            if (result == null)
            {
                throw new Exception("Not Found");
            }

            return result;
        }

        public async Task<PublisherDto> Save(PublisherDto publisherDto)
        {
            if (publisherDto.Id.HasValue)
            {
                //Update
                var result = await _context.Publishers.FindAsync(publisherDto.Id);
                if (result == null)
                {
                    throw new Exception("Not Found");
                }
                else
                {
                    result.Name = publisherDto.Name;
                    result.Address = publisherDto.Address;
                    result.Phone = publisherDto.Phone;

                    _context.Publishers.Update(result);
                    await _context.SaveChangesAsync();

                    return new PublisherDto()
                    {
                        Id = publisherDto.Id,
                        Name = publisherDto.Name,
                        Address = publisherDto.Address,
                        Phone = publisherDto.Phone,
                    };
                }
            }
            else
            {
                //Insert
                Publisher newPublisher = new Publisher()
                {
                    Name = publisherDto.Name,
                    Address = publisherDto.Address,
                    Phone = publisherDto.Phone,
                };

                _context.Publishers.Add(newPublisher);
                await _context.SaveChangesAsync();

                return new PublisherDto()
                {
                    Id = publisherDto.Id,
                    Name = publisherDto.Name,
                    Address = publisherDto.Address,
                    Phone = publisherDto.Phone,
                };
            }
        }

        public async Task<PublisherDto> Delete(int id)
        {
            var result = await _context.Publishers.FindAsync(id);

            if (result == null)
            {
                throw new Exception("Not Found");
            }
            else
            {
                _context.Publishers.Remove(result);
                await _context.SaveChangesAsync();

                return new PublisherDto()
                {
                    Id = id,
                };
            }
        }
    }
}
