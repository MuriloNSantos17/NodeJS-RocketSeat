import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { FetchAnswerCommentsUseCase } from '@/domain/forum/application/use-cases/fetch-answer-comments'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository'
import { makeStudent } from 'test/factories/make-student'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let inMemoryStudentsRepository: InMemoryStudentsRepository
let sut: FetchAnswerCommentsUseCase

describe('Fetch Answer Comments', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository();
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository(inMemoryStudentsRepository)
    sut = new FetchAnswerCommentsUseCase(inMemoryAnswerCommentsRepository)
  })

  it('should be able to fetch answer comments', async () => {
    const student = makeStudent({
      name: 'John Doe'
    });

    inMemoryStudentsRepository.items.push(student)

    const answerComment1 = makeAnswerComment({
      authorId: student.id,
      answerId: new UniqueEntityID('answer-1'),
    });
    const answerComment2 = makeAnswerComment({
      authorId: student.id,
      answerId: new UniqueEntityID('answer-1'),
    });
    const answerComment3 = makeAnswerComment({
      authorId: student.id,
      answerId: new UniqueEntityID('answer-1'),
    });

    await inMemoryAnswerCommentsRepository.create(answerComment1)
    await inMemoryAnswerCommentsRepository.create(answerComment2)
    await inMemoryAnswerCommentsRepository.create(answerComment3)

    const result = await sut.execute({
      answerId: 'answer-1',
      page: 1,
    })

    expect(result.value?.comments).toHaveLength(3)
    expect(result.value?.comments).toEqual(expect.arrayContaining([
      expect.objectContaining({
        author: 'John Doe',
        commentId: answerComment1.id,
      }),
      expect.objectContaining({
        author: 'John Doe',
        commentId: answerComment2.id,
      }),
      expect.objectContaining({
        author: 'John Doe',
        commentId: answerComment3.id,
      })
    ]))
  })

  it('should be able to fetch paginated answer comments', async () => {
    const student = makeStudent({
      name: 'John Doe'
    });

    inMemoryStudentsRepository.items.push(student)

    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerCommentsRepository.create(
        makeAnswerComment({
          answerId: new UniqueEntityID('answer-1'),
          authorId: student.id,
        }),
      )
    }

    const result = await sut.execute({
      answerId: 'answer-1',
      page: 2,
    })

    expect(result.value?.comments).toHaveLength(2)
  })
})
