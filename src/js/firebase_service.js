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
                apiKey: "AIzaSyCBdKLoZWBIHXR_ZU94A6v4MXczmZb-JmQ",
                authDomain: "byubinfutureworks.firebaseapp.com",
                projectId: "byubinfutureworks",
                storageBucket: "byubinfutureworks.firebasestorage.app",
                messagingSenderId: "189595286483",
                appId: "1:189595286483:web:a4eede18b8d6dfe8410d26",
                measurementId: "G-W3ZPLHE68V"
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
     * @param {Object} logsToSave 저장할 데이터 (전체 state.workLogs 또는 특정 날짜의 맵)
     */
    async saveWorkLogs(logsToSave) {
        if (!db) return; // 미연동 시 스킵
        
        try {
            const batch = db.batch();
            const dates = Object.keys(logsToSave);
            
            console.log(`☁️ Firebase 동기화 시작: ${dates.length}일분 데이터`);

            // Firestore Batch는 최대 500개까지만 가능하므로 제어 (사실 날짜가 500개를 넘는 경우는 드물지만 방어적 프로그래밍)
            for (let i = 0; i < Math.min(dates.length, 500); i++) {
                const date = dates[i];
                const docRef = db.collection('team_work_logs').doc(date);
                // merge: true를 사용하여 해당 날짜에 이미 다른 기사 정보가 있어도 안전하게 병합
                batch.set(docRef, logsToSave[date], { merge: true });
            }
            
            await batch.commit();
            console.log("✅ Firebase 데이터 동기화 완료!");
        } catch (error) {
            console.error("❌ Firebase 데이터 동기화 실패:", error);
        }
    }
};
