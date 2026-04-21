/**
 * Bus Driver App - Firebase Integration Service
 */

// 1. Firebase 코어 및 Firestore 초기화
let db = null;

if (typeof firebase === 'undefined') {
    console.error("❌ Firebase SDK가 로드되지 않았습니다. 인터넷 연결이나 스크립트 경로를 확인하세요.");
} else {
    try {
        // [A] Firebase Hosting을 통해 배포된 경우 (자동 연동)
        if (firebase.apps && firebase.apps.length > 0) {
            db = firebase.firestore();
            console.log("🚀 Firebase Hosting 자동 연동(init.js) 성공!");
        } 
    // [B] 로컬(PC 화면)에서 직접 실행할 경우 (수동 연동 필요)
    else {
        const firebaseConfig = {
            // 로컬 테스트용 입력란
            apiKey: "YOUR_API_KEY_HERE",
            authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
            projectId: "YOUR_PROJECT_ID"
        };
        
        if (firebaseConfig.apiKey !== "YOUR_API_KEY_HERE") {
            firebase.initializeApp(firebaseConfig);
            db = firebase.firestore();
            console.log("🚀 Firebase 수동 연동 성공!");
        } else {
            console.warn("⚠️ 로컬 환경 모드: Firebase가 연결되지 않았습니다. 실시간 저장을 보려면 배포된 웹 주소로 접속하시거나 여기에 API 키를 넣으세요.");
        }
    }
} catch (error) {
    console.error("Firebase 초기화 중 에러 발생:", error);
}

window.firebaseService = {
    /**
     * 클라우드 로딩: 앱 실행 시 딱 한 번 불러와서 기존 localStorage와 병합 (양방향 동기화)
     */
    async loadWorkLogs(localLogs) {
        if (!db) return localLogs; // 미연동 시 기존 로컬 데이터만 리턴
        
        try {
            const snapshot = await db.collection('team_work_logs').get();
            const cloudLogs = {};
            
            snapshot.forEach(doc => {
                cloudLogs[doc.id] = doc.data();
            });

            // 클라우드 데이터를 우선으로 병합하되, 로컬에만 있는 것도 보호
            const mergedLogs = { ...localLogs };
            for (let date in cloudLogs) {
                if (!mergedLogs[date]) mergedLogs[date] = {};
                mergedLogs[date] = { ...mergedLogs[date], ...cloudLogs[date] };
            }
            
            console.log("Firebase에서 배차 데이터를 성공적으로 불러왔습니다.");
            return mergedLogs;
            
        } catch (error) {
            console.error("Firebase 데이터 로드 실패:", error);
            return localLogs; // 에러 시 로컬 폴백
        }
    },

    /**
     * 클라우드 저장: 달력이나 분석 완료 후 데이터를 저장할 때 호출
     * @param {Object} updatedWorkLogs 최신화된 전체 workLogs 객체
     */
    async saveWorkLogs(updatedWorkLogs) {
        if (!db) return; // 미연동 시 스킵
        
        try {
            // Firestore 제약: 너무 크면 부담되므로 날짜(date) 단위 Document로 쪼개어 저장합니다.
            const batch = db.batch();
            
            Object.keys(updatedWorkLogs).forEach(date => {
                const docRef = db.collection('team_work_logs').doc(date);
                // 특정 날짜의 멤버 데이터 전체 덮어쓰기 (merge:true 로 기존 필드 보존)
                batch.set(docRef, updatedWorkLogs[date], { merge: true });
            });
            
            await batch.commit();
            console.log("Firebase에 데이터 동기화 완료!");
        } catch (error) {
            console.error("Firebase 데이터 동기화 실패:", error);
        }
    }
};
