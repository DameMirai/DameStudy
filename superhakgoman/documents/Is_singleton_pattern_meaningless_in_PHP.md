## Is Singleton Pattern Meaningless on PHP?

### 문제상황
0. PHP 서버에서 싱글톤 패턴을 사용 중.
1. 싱글톤 클래스 `ClassDoe`는 한 리퀘스트에 대해 단 한 번 불려나가 작업을 하도록 되어 있다.
2. 평소엔 별 문제가 없지만 어떤 특정한 경우에 리퀘스트를 처리하는 로직에서 n회 반복문을 돌면서 해당 클래스의 작업을 n회 호출해버리는 불상사가 생김
3. 리퀘스트 처리 과정에서의 n회 반복문 자체는 회피할 수 없고, `ClassDoe`의 작업만을 반복횟수와 무관하게 1회로 고정해야 한다...!
4. 이를 해결하기 위해 해당 싱글톤 클래스에 필드 변수로 아래와 같은 associative array를 선언
```
$flag = [
    'userId' = null,
    'isDone' = false,
];
```
5. 유저 id에 대해 해당 작업이 실행되었는지를 아래와 같이 검증
```
if($this->flag['userId'] === $givenId && $this->flag['isDone'] === true){
    return false;
}
else{
    $this->flag['userId'] = $givenId;
    $this->flag['isDone'] = $this->DoWork(); //true or false
}
```
6. ...하고 나서 생각해 보니 이런 방식으로 검증하려고 하면
    - 한 유저의 리퀘스트를 처리하는 동안 ```ClassDoe::GetInstance()->DoWork()```가 한 번만 실행되게 하기
    - A유저에 대한 처리가 B유저에게 영향을 주지 않도록 하기

  는 해결할 수 있지만
    - 한 유저가 두 개의 리퀘스트를 연달아 보내는 경우

  에는 두 번째 리퀘스트에서
  ```
  $this->flag['userId'] === $givenId && $this->flag['isDone'] === true
  ```
  가 성립하므로 `ClassDoe::GetInstance()->DoWork()`가 실행되지 않게 되는 문제가 생긴다.
7. ......라고 생각했는데 실제로 서버를 돌려 보니 완전 멀쩡하게 모든 리퀘스트마다 1회 실행되면서 한 유저가 연달아 보내는 리퀘스트에도 대응하는 것이었다. 무슨 일이 일어나고 있는건지 보려고 `ClassDoe::GetInstance->flag`의 값을 출력해 보니, 매 리퀘스트마다 초기값인 `null`과 `false`로 초기화되고 있었다.
8. ............왜?!? 대체 왜.........?!??!


### 테스트테스트

이 문제가 방대한 서버 애플리케이션의 어딘가에서 내가 모르는 뭔가의 기존 코드의 작동으로 인해 발생하는 것인지, PHP의 영문모를 스펙에 의한 것인지 확인하기 위해 아래와 같은 코드를 새로 작성해서 돌려보았다.

```
phpStatic.php

<?php
trait Singleton
{
    protected static $instance;
    final public static function GetInstance(){
        return isset(static::$instance)
        ? static::$instance
        : static::$instance = new static;
    }
}

abstract class Mom
{
    protected $a = null;
    var $b = 0;

    function setA($value)
    {
        $this->a = $value;
    }

    function setB($value)
    {
        $this->b = $value;
    }

    function getA()
    {
        return $this->a;
    }

    function getB()
    {
        return $this->b;
    }
}

class Kid extends Mom
{
    use Singleton{GetInstance as GetIt;}
}

class Man {
    private static $Instance = null;
    public static function GetInstance(){
        if(is_null(self::$Instance)){
            self::$Instance = new Man();
        }
        return self::$Instance;
    }

    var $C = null;
    static $D = null;
}

echo "Before <br>";
echo "Kid->A : "; var_dump(Kid::GetIt()->getA()); echo "<br>";
echo "Kid->B : "; var_dump(Kid::GetIt()->getB()); echo "<br><br>";

Kid::GetIt()->setA($_GET['A']);
Kid::GetIt()->setB($_GET['B']);

echo "After <br>";
echo "Kid->A : "; var_dump(Kid::GetIt()->getA()); echo "<br>";
echo "Kid->B : "; var_dump(Kid::GetIt()->getB()); echo "<br><br>";

echo "Before <br>";
echo "Man->C : "; var_dump(Man::GetInstance()->C); echo "<br>";
echo "Man->D : "; var_dump(Man::GetInstance()->D); echo "<br><br>";

Man::GetInstance()->C = $_GET['C'];
Man::GetInstance()->D = $_GET['D'];

echo "After <br>";
echo "Man->C : "; var_dump(Man::GetInstance()->C); echo "<br>";
echo "Man->D : "; var_dump(Man::GetInstance()->D); echo "<br><br>";
```
(코드에 좀 노-어처구니한 면이 있는 건 원래 작업하던 코드의 구조를 최대한 반영하려고 노력했기 때문이다)

PHP 서버를 실행하고 브라우저에서 위 파일 URL로 들어가면(phpStatic.php?A=1&B=2&C=3&D=4) 아래와 같은 결과를 얻을 수 있다.

```
Before
Kid->A : NULL
Kid->B : int(0)

After
Kid->A : string(1) "1"
Kid->B : string(1) "2"

Before
Man->C : NULL
Man->D : NULL

After
Man->C : string(1) "3"
Man->D : string(1) "4"
```
최초 실행시에도 이후 실행시에도 결과는 매번 같다. (최초에 기대한 바대로라면 두 번째 실행부터는 before에서도 값이 각각 1, 2, 3, 4가 출력되어야 한다) 서로 다른 브라우저를 띄워서 연속해서 리퀘스트를 보내도 결과는 모든 클라이언트에서 같다.

대체.... 대체 왜 값 안 저장요...? 싱글톤 객체는 static하니까 리퀘스트 끝나도 애플리케이션 레벨에서 질질 끌고 메모리 냠냠 처먹으면서 버텨야 하는 것 아닌지....?! [^1] 설마하니 PHP에서는 생명주기고 뭐고 없고 한번 인터프리팅하면 끝인가...?!


### 그런데 그것이 실제로 스펙이었습니다

PHP의 영문모를 동작에 고통받고 있자니 [해결왕 해결킹 정갓이버](https://github.com/flashscope)께서 stackoverflow에서 [같은 문제로 고통받는 상황](http://stackoverflow.com/questions/520132/does-static-variables-in-php-persist-across-the-requests)을 찾아다주셨다. 찬양... 경배...

한 줄로 정리하자면 PHP에서는 `static`으로 선언된 것들도 리퀘스트 한 번 지나면 끝장난다는 것이다. 그래서 다른 언어(내 경우엔 주로 자바)처럼 두고두고 꺼내먹는 용도로 쓸 수가 없다고...
서버측에 뭔가 보관하고 싶은 게 있으면 아래와 같은 방법들을 사용하면 된다고 한다.
1. [Superglobal](http://www.w3schools.com/php/php_superglobals.asp)의 `$_SESSION`을 사용 (세션 scope를 사용하면 되는 경우) <strike>맨날 `$_GET`이랑 `$_POST`만 써서 세션도 있다는 걸 까먹고 있었...</strike>
2. [APC(Alternative PHP Cache)](http://php.net/apc) 사용    
    ([APC를 언제 사용하면 적절한지에 대한 읽을거리](http://stackoverflow.com/questions/3713311/how-do-i-save-data-in-an-application-scope-in-php))
3. [Memcache](http://php.net/manual/kr/book.memcache.php)/[Memcached](http://php.net/manual/kr/book.memcached.php) 사용    
    ([When should I use Memcache instead of Memcached?](http://stackoverflow.com/questions/1442411/when-should-i-use-memcache-instead-of-memcached))
4. 그냥 DB 사용

### 의문

뭐 PHP가 기대와 다른 동작을 하는 게 하루이틀 일도 아니고... 코드가 어떻게 작동하는지만 알면 납득할 수 있다. 원래 그렇게 만들어져 있다는데 어쩌겠나.

다만 의아한 것은 '어차피 static 객체가 유지가 안 될 거면 싱글톤 패턴에 무슨 의미가 있나?' 라는 점...    
싱글톤 클래스를 사용하는 이유는 애플리케이션 전체에서 단 하나만 존재하면 되는 객체를 중복 생성하지 않기 위해서인데
(그래서 생성자도 호출 못하게 막고 객체 자체는 `static`하게 만들어서 어디에서나 사용할 수 있게 하는 것),
이렇게 만든 객체가 어차피 request scope가 사-망함과 동시에 사라진다면 `static`으로 만드는 의미가......?!??
그냥 전역에 인스턴스든 함수든 놔두고 `global` 불러서 쓰면 되지 않을까....?!

[애초에 PHP란건 PHP 프로세스 간에 직접 영향을 주지 않게 만들어져 있다](https://www.quora.com/Why-doesnt-php-have-application-variables-like-asp-and-asp-net)는 얘길 보고 나니 더욱 아리송해졌다. 이쯤 되면 `static` 키워드로 싱글톤 객체를 구현하는 의의는 여러 사람이서 작업할 때 멋모르고 하나면 충분한 인스턴스를 여러 개 생성하지 못하게 하는 정도뿐인게 아닌지....?  
아니 뭐 그건 그것대로 충분히 쓸모있다고 볼 수도 있겠으나.... 으음......


---
[^1]: 이때 좀 잘못 생각했었는데 사실 자바에서도 static 선언했다고 해서 application scope에 적용되는 것은 아니고.. static과 application scope에는 좀 차이가 있다고 한다. [참조 1](https://blogs.oracle.com/groundside/entry/application_scope_v_s_static) / [참조 2](http://www.coderanch.com/t/524004/JSP/java/Application-Scope-Static-Methods)
