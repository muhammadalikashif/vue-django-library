import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from .models import Author, Book

def index(request):
    return render(request, 'myapp/index.html')

@csrf_exempt
def author_list(request):
    """Handle GET, POST, PUT, DELETE for Author."""
    if request.method == 'GET':
        authors = list(Author.objects.values('id', 'name', 'bio'))
        return JsonResponse({'authors': authors})

    elif request.method == 'POST':
        data = json.loads(request.body)
        author = Author.objects.create(name=data['name'], bio=data.get('bio', ''))
        return JsonResponse({'id': author.id, 'name': author.name, 'bio': author.bio})

    elif request.method == 'PUT':
        data = json.loads(request.body)
        author = Author.objects.get(id=data['id'])
        author.name = data['name']
        author.bio = data.get('bio', '')
        author.save()
        return JsonResponse({'id': author.id, 'name': author.name, 'bio': author.bio})

    elif request.method == 'DELETE':
        data = json.loads(request.body)
        Author.objects.filter(id=data['id']).delete()
        return JsonResponse({'message': 'Author deleted'})

@csrf_exempt
def book_list(request):
    """Handle GET, POST, PUT, DELETE for Book."""
    if request.method == 'GET':
        books = Book.objects.prefetch_related('authors').all()
        book_data = []
        for book in books:
            book_data.append({
                'id': book.id,
                'title': book.title,
                'publication_date': book.publication_date,
                'authors': [{'id': author.id, 'name': author.name} for author in book.authors.all()]
            })
        return JsonResponse({'books': book_data})

    elif request.method == 'POST':
        data = json.loads(request.body)
        new_book = Book.objects.create(
            title=data['title'],
            publication_date=data['publication_date']
        )
        # Handle multiple authors
        author_ids = data.get('authors', [])
        if not isinstance(author_ids, list):
            author_ids = [author_ids]
        new_book.authors.set(author_ids)
        
        return JsonResponse({
            'id': new_book.id,
            'title': new_book.title,
            'publication_date': new_book.publication_date,
            'authors': [{'id': author.id, 'name': author.name} for author in new_book.authors.all()]
        })

    elif request.method == 'PUT':
        data = json.loads(request.body)
        book = Book.objects.get(id=data['id'])
        book.title = data['title']
        book.publication_date = data['publication_date']
        
        # Handle multiple authors
        author_ids = data.get('authors', [])
        if not isinstance(author_ids, list):
            author_ids = [author_ids]
        book.authors.set(author_ids)
        book.save()
        
        return JsonResponse({
            'id': book.id,
            'title': book.title,
            'publication_date': book.publication_date,
            'authors': [{'id': author.id, 'name': author.name} for author in book.authors.all()]
        })

    elif request.method == 'DELETE':
        data = json.loads(request.body)
        Book.objects.filter(id=data['id']).delete()
        return JsonResponse({'message': 'Book deleted'})