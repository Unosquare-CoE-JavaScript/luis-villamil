/* 
  * Used when we need to ensure only a single instance exists.
  * It returns that single instance on every constructor call.
  * It maybe difficult to test if used as a direct dependencie.
*/
class SingletonTester
{
  static isSingleton(generator)
  {
    const instance1 = generator();
    const instance2 = generator();
    return instance1 === instance2;
  }
}