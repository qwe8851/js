

## 이벤트 버블링
어떤 HTML 태그에 이벤트가 발생하면 그의 모든 상위요소까지 이벤트가 실행되는 현상

click이라는 이벤트로 예를 들어보면,

HTML 태그에 클릭이 발생하면 그의 모든 상위요소까지 자동으로 클릭되는데 이걸 이벤트버블링 이라고 한다.


#### 이벤트리스너 안에서 쓰는 이벤트 함수들
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


#### 모달창 닫기 버그 해결 방법
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
