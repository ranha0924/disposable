// 제목을 URL에 쓸 slug로 바꾼다.
// 영문 소문자와 숫자만 남기고, 그 사이의 공백·기호 덩어리는 하이픈 하나로 바꾼다.
export function slugify(text) {
  if (typeof text !== 'string') {
    throw new TypeError('slugify: text must be a string');
  }
  const slug = text
    .replace(/[A-Z]/g, (c) => c.toLowerCase())
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return slug || 'untitled';
}
