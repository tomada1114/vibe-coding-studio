/**
 * Tests for Command Type Definitions
 *
 * These tests verify the helper functions for command metadata processing.
 */

import {
  isValidSlug,
  parseCommaSeparated,
  slugToTitle,
  type CommandMetadata,
} from '../command'

describe('Command Type Definitions', () => {
  describe('slugToTitle', () => {
    it('converts kebab-case to Title Case', () => {
      expect(slugToTitle('convert-video')).toBe('Convert Video')
      expect(slugToTitle('pr-description')).toBe('Pr Description')
      expect(slugToTitle('review-code')).toBe('Review Code')
    })

    it('handles single word slugs', () => {
      expect(slugToTitle('test')).toBe('Test')
    })

    it('handles slugs with multiple hyphens', () => {
      expect(slugToTitle('a-b-c-d')).toBe('A B C D')
    })

    it('handles empty string', () => {
      expect(slugToTitle('')).toBe('')
    })
  })

  describe('parseCommaSeparated', () => {
    it('parses comma-separated values', () => {
      expect(parseCommaSeparated('Read, Write, Edit')).toEqual([
        'Read',
        'Write',
        'Edit',
      ])
    })

    it('trims whitespace from values', () => {
      expect(parseCommaSeparated('  Read  ,  Write  ,  Edit  ')).toEqual([
        'Read',
        'Write',
        'Edit',
      ])
    })

    it('handles single value', () => {
      expect(parseCommaSeparated('Read')).toEqual(['Read'])
    })

    it('returns empty array for undefined', () => {
      expect(parseCommaSeparated(undefined)).toEqual([])
    })

    it('returns empty array for empty string', () => {
      expect(parseCommaSeparated('')).toEqual([])
    })
  })

  describe('isValidSlug', () => {
    it('accepts valid slugs with lowercase letters and hyphens', () => {
      expect(isValidSlug('convert-video')).toBe(true)
      expect(isValidSlug('pr-description')).toBe(true)
      expect(isValidSlug('review-code')).toBe(true)
    })

    it('accepts valid slugs with underscores', () => {
      expect(isValidSlug('test_command')).toBe(true)
      expect(isValidSlug('my_custom_command')).toBe(true)
    })

    it('accepts valid slugs with numbers', () => {
      expect(isValidSlug('command123')).toBe(true)
      expect(isValidSlug('test-2024')).toBe(true)
    })

    it('rejects slugs with uppercase letters', () => {
      expect(isValidSlug('Convert-Video')).toBe(false)
      expect(isValidSlug('PR-Description')).toBe(false)
    })

    it('rejects slugs with spaces', () => {
      expect(isValidSlug('convert video')).toBe(false)
    })

    it('rejects slugs with special characters', () => {
      expect(isValidSlug('convert@video')).toBe(false)
      expect(isValidSlug('pr!description')).toBe(false)
      expect(isValidSlug('review.code')).toBe(false)
    })

    it('rejects empty string', () => {
      expect(isValidSlug('')).toBe(false)
    })
  })

  describe('CommandMetadata interface', () => {
    it('should be correctly typed', () => {
      const command: CommandMetadata = {
        slug: 'test-command',
        title: 'Test Command',
        description: 'A test command',
        allowedTools: ['Read', 'Write'],
        argumentHint: '<arg>',
        content: '# Test\n\nContent here',
        rawContent: '---\ndescription: A test command\n---\n# Test\n\nContent here',
      }

      expect(command.slug).toBe('test-command')
      expect(command.title).toBe('Test Command')
      expect(command.description).toBe('A test command')
      expect(command.allowedTools).toEqual(['Read', 'Write'])
      expect(command.argumentHint).toBe('<arg>')
      expect(command.content).toBe('# Test\n\nContent here')
      expect(command.rawContent).toContain('description: A test command')
    })

    it('should allow optional lastModified field', () => {
      const command: CommandMetadata = {
        slug: 'test',
        title: 'Test',
        description: '',
        allowedTools: [],
        argumentHint: '',
        content: '',
        rawContent: '',
        lastModified: '2024-10-30T00:00:00.000Z',
      }

      expect(command.lastModified).toBe('2024-10-30T00:00:00.000Z')
    })
  })
})
