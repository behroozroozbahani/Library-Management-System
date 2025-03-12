using EndPoint.ModelDto;
using EndPoint.Models.DBContext;
using Microsoft.EntityFrameworkCore;

namespace EndPoint.Models.Services
{
    public interface IGenreService
    {
        Task<List<GenreDto>> Get();
        Task<GenreDto> Save(GenreDto genreDto);
        Task<GenreDto> Delete(int id);
    }

    public class GenreService : IGenreService
    {
        private readonly DataBaseContext _context;

        public GenreService(DataBaseContext context)
        {
            _context = context;
        }
        public async Task<List<GenreDto>> Get()
        {
            var result = await _context.Genres.Select(x => new GenreDto()
            {
                Id = x.Id,
                Name = x.Name,

            }).ToListAsync();

            if (result == null)
            {
                throw new Exception("Not Found");
            }

            return result;
        }

        public async Task<GenreDto> Save(GenreDto genreDto)
        {
            if (genreDto.Id.HasValue)
            {
                //Update
                var result = await _context.Genres.FindAsync(genreDto.Id);
                if (result == null)
                {
                    throw new Exception("Not Found");
                }
                else
                {
                    result.Name = genreDto.Name;

                    _context.Genres.Update(result);
                    await _context.SaveChangesAsync();

                    return new GenreDto()
                    {
                        Id = genreDto.Id,
                        Name = genreDto.Name,
                    };
                }
            }
            else
            {
                //Insert
                Genre newGenre = new Genre()
                {
                    Name = genreDto.Name,
                };

                _context.Genres.Add(newGenre);
                await _context.SaveChangesAsync();

                return new GenreDto()
                {
                    Id = genreDto.Id,
                    Name = genreDto.Name,
                };
            }
        }

        public async Task<GenreDto> Delete(int id)
        {
            var result = await _context.Genres.FindAsync(id);

            if (result == null)
            {
                throw new Exception("Not Found");
            }
            else
            {
                _context.Genres.Remove(result);
                await _context.SaveChangesAsync();

                return new GenreDto()
                {
                    Id = id,
                };
            }
        }
    }
}
