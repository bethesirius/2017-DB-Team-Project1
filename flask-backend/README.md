# 개발환경
    Python 3.6(package list는 requirements.txt에서 확인)
    
# 설치가이드
    pip install -r requirements.txt
    
# 실행
    python3.6 flask-backend.py
    
# Directory
    - app : api server source code
        - table_model : db table 생성을 위한 모델
    - eer_diagram : workbench에서 생성한 eer diagram(gui)

# Package Manage
    pip freeze > requirements.txt
    버전 및 패키지 추가시 꼭 freeze 해줄것!

# DataBase
    aws-RDS(maria DB) 사용
    모든 쿼리는 sqlAlchemy(ORM)로 관리하므로 되도록 직접 쿼리를 날려서 수정하지 말 것
    Table 생성시엔 app-module-table_creator.py를 이용해서 자동생성
    (db를 삭제 후 재생성하여 table을 다시 그림)
    
    eer-diagram(gui)로 확인이 필요한 경우,
    eer_diagram 내에 있는 .mwb로 확인(mysql workbench로 열람 가능)