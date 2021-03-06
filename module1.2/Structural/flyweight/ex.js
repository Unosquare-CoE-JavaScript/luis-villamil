/* 
  * It's a technique to save memory by supporting a very large numbers of similar objects.
*/
class Sentence
{
  constructor(plainText)
  {
    this.words = plainText.split(' ');
    this.capitalize = false;
    this.indexToCapitalize;
  }

  at(index)
  {
    this.indexToCapitalize = index;
    return this;
  }

  toString()
  {
    if (this.capitalize) {
      this.words[this.indexToCapitalize] = this.words[this.indexToCapitalize].toUpperCase();
    }
    return this.words.join(' ');
  }
}