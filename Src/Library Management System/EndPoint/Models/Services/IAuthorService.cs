using EndPoint.ModelDto;
using EndPoint.Models.DBContext;
using Microsoft.EntityFrameworkCore;

namespace EndPoint.Models.Services
{
    public interface IAuthorService
    {
        Task<List<AuthorDto>> Get();
        Task<AuthorDto> Save(AuthorDto authorDto);
        Task<AuthorDto> Delete(int id);
    }

    public class AuthorService : IAuthorService
    {
        private readonly DataBaseContext _context;

        public AuthorService(DataBaseContext context)
        {
            _context = context;
        }

        public async Task<List<AuthorDto>> Get()
        {
            var result = await _context.Authors.Select(x => new AuthorDto()
            {
                Id = x.Id,
                FirstName = x.FirstName,
                LastName = x.LastName,
                DateOfBirth = x.DateOfBirth,
                DateOfDeath = x.DateOfDeath,

            }).ToListAsync();

            if (result == null)
            {
                throw new Exception("Not Found");
            }

            return result;
        }

        public async Task<AuthorDto> Save(AuthorDto authorDto)
        {
            if (authorDto.Id.HasValue)
            {
                //Update
                var result = await _context.Authors.FindAsync(authorDto.Id);
                if (result == null)
                {
                    throw new Exception("Not Found");
                }
                else
                {
                    result.FirstName = authorDto.FirstName;
                    result.LastName = authorDto.LastName;
                    result.DateOfBirth = authorDto.DateOfBirth;
                    result.DateOfDeath = authorDto.DateOfDeath;

                    _context.Authors.Update(result);
                    await _context.SaveChangesAsync();

                    return new AuthorDto()
                    {
                        Id = authorDto.Id,
                        LastName = authorDto.FirstName,
                        FirstName = authorDto.FirstName,
                        DateOfBirth = authorDto.DateOfBirth,
                        DateOfDeath = authorDto.DateOfDeath,
                    };
                }
            }
            else
            {
                //Insert
                Author newAuthor = new Author()
                {
                    FirstName = authorDto.FirstName,
                    LastName = authorDto.LastName,
                    DateOfBirth = authorDto.DateOfBirth,
                    DateOfDeath = authorDto.DateOfDeath,
                };

                _context.Authors.Add(newAuthor);
                await _context.SaveChangesAsync();

                return new AuthorDto()
                {
                    Id = authorDto.Id,
                    LastName = authorDto.FirstName,
                    FirstName = authorDto.FirstName,
                    DateOfBirth = authorDto.DateOfBirth,
                    DateOfDeath = authorDto.DateOfDeath,
                };
            }
        }

        public async Task<AuthorDto> Delete(int id)
        {
            var result = await _context.Authors.FindAsync(id);

            if (result == null)
            {
                throw new Exception("Not Found");
            }
            else
            {
                _context.Authors.Remove(result);
                await _context.SaveChangesAsync();

                return new AuthorDto()
                {
                    Id = id,
                };
            }
        }
    }
}