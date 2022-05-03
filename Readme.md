

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
