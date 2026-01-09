using EndPoint.ModelDto;
using EndPoint.Models.DBContext;
using Microsoft.EntityFrameworkCore;

namespace EndPoint.Models.Services
{
    public interface IBookService
    {
        Task<List<BookDto>> Get();
        Task<BookDto> Save(BookDto bookDto);
        Task<BookDto> Delete(int id);
    }

    public class BookService : IBookService
    {
        private readonly DataBaseContext _context;

        public BookService(DataBaseContext context)
        {
            _context = context;
        }
        public async Task<List<BookDto>> Get()
        {
            var result = await _context.Books.Select(x => new BookDto()
            {
                Id = x.Id,
                Title = x.Title,
                AuthorId = x.AuthorId,
                GenreId = x.GenreId,
                PublisherId = x.PublisherId,
                PublishDate = x.PublishDate,

            }).ToListAsync();

            if (result == null)
            {
                throw new Exception("Not Found");
            }

            return result;
        }

        public async Task<BookDto> Save(BookDto bookDto)
        {
            if (bookDto.Id.HasValue)
            {
                //Update
                var result = await _context.Books.FindAsync(bookDto.Id);
                if (result == null)
                {
                    throw new Exception("Not Found");
                }
                else
                {
                    result.Title = bookDto.Title;
                    result.AuthorId = bookDto.AuthorId;
                    result.GenreId = bookDto.GenreId;
                    result.PublisherId = bookDto.PublisherId;
                    result.PublishDate = bookDto.PublishDate;

                    _context.Books.Update(result);
                    await _context.SaveChangesAsync();

                    return new BookDto()
                    {
                        Id = bookDto.Id,
                        Title = bookDto.Title,
                        AuthorId = bookDto.AuthorId,
                        GenreId = bookDto.GenreId,
                        PublisherId = bookDto.PublisherId,
                        PublishDate = bookDto.PublishDate,
                    };
                }
            }
            else
            {
                //Insert
                Book newBook = new Book()
                {
                    Title = bookDto.Title,
                    AuthorId = bookDto.AuthorId,
                    GenreId = bookDto.GenreId,
                    PublisherId = bookDto.PublisherId,
                    PublishDate = bookDto.PublishDate,
                };

                _context.Books.Add(newBook);
                await _context.SaveChangesAsync();

                return new BookDto()
                {
                    Id = bookDto.Id,
                    Title = bookDto.Title,
                    AuthorId = bookDto.AuthorId,
                    GenreId = bookDto.GenreId,
                    PublisherId = bookDto.PublisherId,
                    PublishDate = bookDto.PublishDate,
                };
            }
        }

        public async Task<BookDto> Delete(int id)
        {
            var result = await _context.Books.FindAsync(id);

            if (result == null)
            {
                throw new Exception("Not Found");
            }
            else
            {
                _context.Books.Remove(result);
                await _context.SaveChangesAsync();

                return new BookDto()
                {
                    Id = id,
                };
            }
        }
    }
}
