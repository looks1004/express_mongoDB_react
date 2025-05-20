# express_mongoDB_react
mongoDB와 express를 이용한 회원가입 및 게시판 개발



yarn create vite

cd vite-project
  yarn
  yarn dev       

code . -r
yarn add axios
yarn add recoil
yarn add sass
yarn add react-router-dom
yarn add @types/node
yarn add react-simple-toasts


--이런 방법이 있다 정도만 참조... 순서와 명령어 실행 방법은 다름 (아래 기재한 순서대로 진행)
https://velog.io/@yeoonnii/%EC%98%A4%ED%94%84%EB%9D%BC%EC%9D%B8%EC%97%90%EC%84%9C-React-%ED%8C%A8%ED%82%A4%EC%A7%80-%EB%A7%A4%EB%8B%88%EC%A0%80npmyarn-install%ED%95%98%EA%B8%B0


도스창 관리자모드에서 
corepack enable

vscode 홈디렉토리로 가서 
yarn create vite

cd vite-project
  yarn
  yarn dev       

code . -r
yarn add react@18 react-dom@18
yarn add react-simple-toasts => yarn add react-simple-toasts@5.10.0
yarn add axios -> yarn add axios@1.6.8
yarn add recoil
yarn add sass
yarn add react-router-dom 
yarn add @types/node



yarn list

.yarnrc 파일 작성 (기존파일 복사해 오면 됨 ) 

node_modules와 yarn.lock파일을 삭제 -> 시간 오래걸림

yarn cache clean  -> 시간 오래걸림

yarn 

npm-packages-offline-cache 폴더에  *.tgz 파일 생성된거 확인 

node_modules와 yarn.lock파일을 삭제 

와이파이 차단 

yarn install --offline

와이파이 차단 상태에서 yarn dev 실행하여 확인 

이후 프로젝트 폴더 전체를 압축하여 vdi로 복사

vdi에 yarn 설치할 필요 없이 
압축 풀어서 바로 yarn dev  실행하여 확인하면 됨 


----front/backend 각각 구성  ....
https://www.youtube.com/watch?v=TGh-SO07dYY&list=PLrTFeWWAg1chZ4uUrDm8Q-kFjKt-hVEXE&index=9

----25.04.18 front : React
yarn add react-bootstrap
yarn add react-router-dom
yarn add axios 
yarn add jquery
yarn add jquery.cookie
yarn add ckeditor4-react

--- backEnd : Node.js  (설치는 5강에서 ... mongoos는 6강 )
도스창 관리자모드에서 
corepack enable

vite 프로젝트 생성과 동일 하게 시작....

yarn add nodemon 
yarn add express 
yarn add express-session
yarn add cors
yarn add mongoose

package.json 에 script 추가하고 
package.json에서 "type": "module"을 제거 
yarn start 로 구동 .. 



  "scripts": {
    "start": "nodemon server",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  
  ============================================================



===25.05.25
1. 탐색기에 새로운 폴더 생성
2. cmd 열어서 위 폴더에서 git --version 으로 확인
3. cmd ....  git clone github 주소 입력
4. cmd .... 해당 디렉토리로 이동
5. 탐색기에서 원하는 소스를 해당 디렉토리에 복사한다 readme 파일은 덮어쓰기 한다

git config user.email "hp7984@naver.com"
git config user.name "김호용"
git init

6. cmd 에서 git add .
7. cmd 에서 git status 로 origin/main 인지 확인하고 변경된 빨간색 파일목록을 확인한다

8. cmd 에서 git commit -m "2nd_25.05.20. express_other file"
9. git push origin main



==============
git bash를 이용하여 github에 유니티 프로젝트를 올리는 중 에러 메세지가 발생하였다.
error: failed to push some refs to 

로컬 브랜치에서 "git pull" 명령어를 실행하여 원격 브랜치를 업데이트 한다.

그 다음, "git push" 명령어를 다시 실행하면 문제가 해결된다.
