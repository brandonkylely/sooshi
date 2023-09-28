// Integration tests
import { expect, test, vi } from 'vitest'
import renderer from 'react-test-renderer'
import axios from 'axios'
import FeedPage from '../pages/FeedPage'

function toJson(component) {
  const result = component.toJSON()
  expect(result).toBeDefined()
  expect(result).not.toBeInstanceOf(Array)
  return result
}

test('Testing Library Works', () => {
  expect(true).toBe(true)
})

test('Feed Page Integration Test', async () => {
  // Create a mock function for axios.get
  const axiosGetMock = vi.fn()

  // set return value for axios.get
  axiosGetMock.mockReturnValue(Promise.resolve({ data: { /* mock data */} }))

  // TODO: replace the axios get function with mock

  // render the component
  const component = renderer.create(<FeedPage />)

  // wait for promises to resolve
  await Promise.resolve()

  // component renders correctly
  const tree = toJson(component)
  expect(tree).toMatchSnapshot()
})