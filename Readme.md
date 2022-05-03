

## 이벤트 버블링
어떤 HTML 태그에 이벤트가 발생하면 그의 모든 상위요소까지 이벤트가 실행되는 현상

click이라는 이벤트로 예를 들어보면,

HTML 태그에 클릭이 발생하면 그의 모든 상위요소까지 자동으로 클릭되는데 이걸 이벤트버블링 이라고 한다.


> #### 이벤트리스너 안에서 쓰는 이벤트 함수들
``` js
document.querySelector('.black-bg').addEventListener('click', function(e){
	e.target; 
	e.currentTarget; 
	e.preventDefault(); 
	e.stopPropagation(); 
});
```
이벤트리스너의 콜백함수에 파라미터 아무거나 추가하면 이벤트 관련 유용한 함수들을 사용 가능하다.
파라미터 이름은 아무렇게나 작명하면 되는데,
보통 대충 e라고 함

**e.target** : 실제 클릭한 요소 알려줌 (이벤트 발생한 곳)
**e.currentTarget** : 지금 이벤트리스너가 달린 곳 알려줌 (참고로 this라고 써도 똑같음)
**e.preventDefault()** : 실행하면 이벤트 기본 동작을 막아줌
**e.stopPropagation()** : 실행하면 내 상위요소로의 이벤트 버블링을 중단해줌

※ 중요! e.target은 이벤트 버블링이 일어난다고 해도 사용자가 실제로 클릭한 그 요소를 찾아낼 수 있다.


>#### 모달창 닫기 버그 해결 방법
.black-bg클릭 시,
지금 실제로 클릭한게 검은 배경일 때만 닫기!

``` js
document.querySelector('.black-bg').addEventListener('click', function(e){
	if (지금 실제로 클릭한거 == 검은 배경) {
		document.querySelector('.black-bg').classList.remove('show-modal');
	}
})
```
이런식으로.

지금 실제로 클릭한 것→ e.target
검은 배경→ document.querySelector('.black-bg')

``` js
document.querySelector('.black-bg').addEventListener('click', function(e){ 
	if ( e.target == document.querySelector('.black-bg') ) { 
		document.querySelector('.black-bg').classList.remove('show-modal'); 
	}
})
```
(참고1)
여기서 e.currentTarget을 출력해 보면 검은배경이 나오기 때문에 
e.target == e.currentTarget 이렇게 써도 된다.
아니면 e.target == this 로 써도 된다.

(참고2)
jQuery 셀렉터로 찾은 결과와 querySelector 셀렉터로 찾은 결과가 다르다.

출력해보면 전자는 이상한 object 이런게 나오고 후자는 <html> 이 나온다.
그래서 e.target == $('.black-bg') 이건 사용이 불가능하며,
애초에 jQuery 셀렉터끼리 등호비교는 불가능!

방법 1) \$('.black-bg').is(\$('.black-bg')) 
이런 비교용 함수를 쓴다.

방법 2) \$(e.target).is(\$('.black-bg'))


## 이벤트 버블링 응용과 dataset

[전에 만들어둔 탭기능 코드]
```js
for (let i = 0; i < $('.tab-button').length; i++){
	$('.tab-button').eq(i).on('click', function(){
		$('.tab-button').removeClass('orange'); 
		$('.tab-button').eq(i).addClass('orange');
		$('.tab-content').removeClass('show'); 
		$('.tab-content').eq(i).addClass('show'); 
	}) 
});
```  

> #### 전에 만들었던 탭기능 함수로 축약해보기
함수로 축약했을 때의 장점은
1. 재사용성
2. 이해가 쉽다

```js
for (let i = 0; i < $('.tab-button').length; i++){
	$('.tab-button').eq(i).on('click', function(){
		탭열기(i);
	});
});

function 탭열기(구멍){
	$('.tab-button').removeClass('orange');
	$('.tab-button').eq(구멍).addClass('orange');
	$('.tab-content').removeClass('show');
	$('.tab-content').eq(구멍).addClass('show');
}
```  
**Q. 왜 구멍뚫음?**
A. 함수로 코드를 싸맬 때 안에 변수가 들어있으면 변수를 전부 파라미터로 바궈주어야 잘 동작한다. 
그래서 i 부분을 전부 파라미터로 변경함.

이제 함수 사용할 때
**탭열기(0)**  이러면 0번 탭이 열림
**탭열기(1)**  이러면 1번 탭이 열림
**탭열기(2)**  이러면 2번 탭이 열림

> #### 이벤트버블링을 알면 이벤트리스너를 줄일 수 있음
지금 탭을 만들 때 이벤트리스너를 3개나 부착했지만(버튼이 3개니까), 이벤트리스너 1개만 써도 충분히 기능구현이 가능함.

이벤트버블링을 이용하면 버튼 3개의 부모인 **.list**에 이벤트리스너 1개만 있어도 탭기능만들 수 있다.

```js
$('.list').click(function(e){ 
	if (e.target == document.querySelectorAll('.tab-button')[0] )
		탭열기(0);
	} 
	if (e.target == document.querySelectorAll('.tab-button')[1] )
		탭열기(1);
	} 
	if (e.target == document.querySelectorAll('.tab-button')[2] ) 
		탭열기(2);
	} 
}); 

function 탭열기(){ 
	생략 
}
```
dataset문법을 알면 위 코드를 좀 더 짧게 바꿀 수 있다.

> #### dataset문법
```html
<div data-데이터이름="값"></div>
```
html안에 유저 몰래 정보를 숨겨놓을 수 있다.
데이터이름은 아무렇게나 작명하고 값을 넣어주면 된다.

```js
document.querySelector().dataset.데이터이름;
```
출력해보면 html요소에 숨겨두었던 데이터가 이 자리에 남는다.

```html
<li class="tab-button" data-id="0">Products</li>
<li class="tab-button orange" data-id="1">Information</li>
<li class="tab-button" data-id="2">Shipping</li>
```
▲ 우선 탭의 버튼들에 이렇게 데이터를 넣어둔다.
아까는 if문이 3개였음
버튼0 누르면 탭열기(0)실행~
버튼1 누르면 탭열기(1)실행~
버튼2 누르면 탭열기(2)실행~

```js
$('.list').click(function(){ 
	탭열기(지금누른버튼에 숨어있던 data-id) 
});
```
▲ 근데 이렇게 코드짜면 굳이 if문이 필요없이 한 줄로 해결할 수 있다.
**지금누른버튼에 숨어있던 data-id를 알려주는** 코드도 있다!

```js
$('.list').click(function(){ 
	탭열기(지금누른버튼에 숨어있던 data-id) 
});
```
▲ 지금누른 버튼을 찾고 싶으면 e.target이고
거기 숨어있는 data-id 꺼내고 싶으면 .dataset.id 붙이면 된다.


## Array와 Object 자료형
>### Array
```html
let car = ['소나타', 50000, 'white']; 
car[1] = 60000;  //수정
console.log(car[1]);
```
대괄호를 열고 자료를 콤마로 구분해 넣어주면 되며, 
데이터를 뽑을 땐, 뒤에 [n]을 붙여 n번째 자료를 출력할 수 있다.

>### Object 
```html
var car2 = { name : '소나타', price : 50000 }; 
car2['name'] = '그랜저';  //수정
console.log(car2.name);
```
똑같이 중괄호를 열고 콤마로 구분해 넣어주면 되는데, 
자료 왼쪽에 자료의 이름을 붙여 저장해야한다.

object자료형은 key:value 형태로 자료를 저장할 수 있다.

데이터를 뽑을 땐, 뒤에 ['key']를 붙여 value를 출력할 수 있고,
.key이런식으로 써도 가능

>### Array/Object  차이
array는 순서개념이 있어 자료를 뽑을때 **price가 몇 번째 위치**에 있었는지를 기억해야 한다.
object는 **key이름**을 기억하면 되므로 자료양이 많을때 편리함.

>### Array/Object  차이2
array는 순서개념이 있어 먼저 적을수록 더 앞에 있는 자료임.
object는 순서개념이 없어 가장 먼저 적었다고 해도 첫번째 자료임을 인정해 주지 않는다.

array는 순서개념이 있다보니
 - 가나다라순 정렬(.sort()) 
 - x번 자료부터 y번 자료까지 자르기 (slice(x, y))
 - n번 자료 바꾸기 (.push(n))
 - 맨 뒤, 맨 앞에 자료 넣기
 - 원하는 자료가 들어있나 검색

이런것들이 가능하다.


















---
## 쓸만한 자바스크립트 라이브러리들
>### 1. swioper
캐러셀 (이미지슬라이드) 만들 때

[https://swiperjs.com/get-started#use-swiper-from-cdn](https://swiperjs.com/get-started#use-swiper-from-cdn)
여기가서 튜토리얼 그대로 js 파일, css 파일을 다운받아서 첨부한 뒤에
html css js 예제코드 복사붙여넣기하면 캐러셀이 나옴.


>### 2. Chart.js
웹페이지에서 차트를 만들고 싶을때 쓴다.

[https://cdnjs.com/libraries/Chart.js](https://cdnjs.com/libraries/Chart.js)
여기서 js 파일 다운받거나 cdn 버전으로 구해서 html 파일에 넣으면 설치끝임.

[https://www.chartjs.org/docs/latest/](https://www.chartjs.org/docs/latest/)
그리고 Chart.js 홈페이지 예제 코드 아무데나 붙여넣기 하면 차트나옴.


>### 3.  Animate On Scroll
스크롤 내리면 요소가 서서히 등장하는 애니메이션을 만들고 싶을 때 쓰면 좋음.

유저가 스크롤바를 div 박스 현재 y좌표만큼 내리면 애니메이션 보여달라고 코드짜는 것보다 간편함

[https://github.com/michalsnik/aos](https://github.com/michalsnik/aos)
여기서 css파일, js 파일 cdn버전 찾아서 html 파일에 넣고
그 다음에 밑에 <script> 태그 열어서
```html
<script> 
	AOS.init(); 
</script>
```
넣으면 설치 끝

[https://michalsnik.github.io/aos/](https://michalsnik.github.io/aos/)
그 다음에 위 사이트에서 예제 코드 따라서 복붙하면 구현 끝

<div data-aos="fade-up"></div>
원하는 박스에 이런거 추가하면 된다고 함.
시간, 방향 설정가능하고 원하는 클래스명 부착도 됨.


>### 4. EmailJS
원래 이메일  전송은 서버가 해야 하지만 Gmail이런거 서버를 잠깐 빌리면 자바스크립트만으로 이메일 전송이 가능하다.
유저가 내 이메일 계정으로 이메일 전송도 가능하고
내 이메일 계정으로 남에게 이메일 전송도 가능함

[https://www.emailjs.com/docs/introduction/how-does-emailjs-work/](https://www.emailjs.com/docs/introduction/how-does-emailjs-work/)
이 사이트 가서 계정만들고
튜토리얼 그대로 복붙하고 거기에 내가 방금 만든 EmailJS 계정아이디만 채우면 끝.


>### 5. Lodash
array, object, 문자, 숫자 자료를 다루기 편해지는 기본 함수들을 제공해준다.

[https://lodash.com/](https://lodash.com/)
예를 들어 array자료에 있는 마음에 안드는 'a'라는 문자를 제거하고 싶으면 
직접 반복문 돌리거나 filter함수 쓰면 되는데,

Lodash설치해 놨으면 그냥 **_.pull(어레이자료, 'a');** 쓰면 된다.


>### 6. React/Vue
페이지가 너무 많아서 UI재활용이 자주 필요한 사이트나 모바일 앱처럼 페이지 이동없이 동작하는 Single Page Application을 만들 때 유용한 자바스크립트 라이브러리.


>### 7. Fullpage.js
웹페이지를 ppt처럼 만들어 줌 

[https://github.com/alvarotrigo/fullPage.js/tree/master/lang/korean#fullpagejs](https://github.com/alvarotrigo/fullPage.js/tree/master/lang/korean#fullpagejs)
여기서 css, js 파일을 cdn 식으로 설치,
html과 js 코드를 복사붙여넣기하면 완성.
