#nullable disable

namespace EndPoint.Models
{
    public partial class Book
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int AuthorId { get; set; }
        public int GenreId { get; set; }
        public int PublisherId { get; set; }
        public DateTime PublishDate { get; set; }

        public virtual Author Author { get; set; }
        public virtual Genre Genre { get; set; }
        public virtual Publisher Publisher { get; set; }
    }
}
