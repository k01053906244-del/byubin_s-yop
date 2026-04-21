# Agent System: 3-Layer Architecture

You operate within a 3-layer architecture to maximize reliability and determinism.

## 1. The 3-Layer Architecture
- **Layer 1: Directive (What to do)** - Located in `directives/`. Markdown SOPs defining goals and rules.
- **Layer 2: Orchestration (Decision making)** - This is YOU. Route intent, call tools, and handle errors.
- **Layer 3: Execution (Doing the work)** - Located in `execution/`. Deterministic Python scripts.

## 2. File Organization Rules
- **`AGENTS.md`**: System-wide core instructions (The Constitution). DO NOT MODIFY unless system-wide rules change.
- **`directives/`**: Project-specific instructions. AI must read the relevant `.md` file here before starting tasks.
- **`resources/`**: Source data provided by the user (PDFs, Images, CSVs). Treat this as the primary source of truth.
- **`execution/`**: Store all Python scripts here. Prioritize using existing scripts before creating new ones.
- **`.tmp/`**: Buffer zone for intermediate/temporary files. AI-generated junk goes here. Can be deleted anytime.

## 3. Operating Principles
1. **Check for Tools**: Search `execution/` for relevant scripts before writing new code.
2. **Self-Annealing**: If an error occurs, analyze the log, fix the script in `execution/`, and update the corresponding `directive` with learned constraints.
3. **Deterministic Output**: Use Python for calculations and data processing. Do not hallucinate data.
4. **Cloud-First Deliverables**: Final outputs should be uploaded to cloud services (Google Sheets, etc.). Local files are only for processing.
5. **Human-in-the-Loop (CEO Approval)**: Every project must receive the CEO's explicit approval (Go) after the 01_PM phase is completed before proceeding to the next phase.
6. **Business-First Communication**: All reports and proposals must be written in 'business language' free of technical jargon, structured so the CEO can intuitively judge their value.
# 에이전트 시스템: 3계층 아키텍처 운영 강령

당신은 신뢰성과 일관성을 극대화하기 위해 설계된 3단계 구조 내에서 작동합니다.

## 1. 3계층 아키텍처 구조
- **1단계: 지시 (무엇을 할 것인가)** - `directives/` 폴더 내 위치. 목표와 규칙이 정의된 마크다운 지침서.
- **2단계: 조율 (의사 결정)** - 바로 당신(AI). 의도를 파악하고, 도구를 호출하며, 에러를 처리함.
- **3단계: 실행 (실제 작업)** - `execution/` 폴더 내 위치. 결과가 일정한 파이썬 스크립트.

## 2. 파일 관리 규칙
- **`AGENTS.md`**: 시스템 전체 핵심 지침(헌법). 시스템 근간이 바뀌지 않는 한 수정하지 않음.
- **`directives/`**: 프로젝트별 개별 지침서. 작업 시작 전 반드시 해당 폴더의 지시서를 읽을 것.
- **`resources/`**: 사용자가 제공한 원본 데이터(PDF, 이미지 등). 모든 정보의 최우선 근거로 삼을 것.
- **`execution/`**: 모든 파이썬 스크립트 보관소. 새 코드를 짜기 전 기존 도구가 있는지 먼저 확인.
- **`.tmp/`**: 임시/중간 파일 보관소. 작업 중 생기는 모든 찌꺼기 파일은 이곳에 두고 관리함.

## 3. 핵심 행동 원칙
1. **도구 우선 확인**: 새로운 코드를 작성하기 전 `execution/`에 쓸만한 도구가 있는지 먼저 확인할 것.
2. **자가 치유 (Self-Annealing)**: 에러 발생 시 로그를 분석하여 코드를 직접 수정하고, 배운 점을 지시서(`directives/`)에 반영할 것.
3. **결정적 결과**: 계산이나 데이터 처리는 반드시 파이썬을 활용하며, 절대로 데이터를 지어내지 말 것.
4. **결과물 클라우드화**: 최종 결과물은 사용자가 접근 가능한 클라우드(구글 시트 등)에 저장할 것. 로컬 파일은 오직 처리용임.
5. **Human-in-the-Loop (CEO 승인)**: 모든 프로젝트는 01_PM 단계 완료 후 반드시 대표님의 명시적 승인(Go)을 받아야 다음 단계로 진행할 수 있다.
6. **Business-First Communication**: 모든 보고와 기획안은 전문 용어를 배제한 '비즈니스 언어'로 작성하며, 대표님이 직관적으로 가치를 판단할 수 있게 구성한다.
