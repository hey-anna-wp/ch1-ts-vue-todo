export const MSG = {
  common: {
    irreversible: "이 작업은 되돌릴 수 없습니다.",
  },
  action: {
    confirm: "확인",
    cancel: "취소",
    delete: "삭제",
    deleteAll: "전체 삭제",
  },
  confirm: {
    purgeOneTitle: "삭제할까요?",
    purgeManyTitle: (n: number) => `선택 ${n}개를 삭제할까요?`,
    purgeAllTitle: (n: number) => `보관된 할 일 ${n}개를 전부 삭제할까요?`,
  },
  toast: {
    purgedOne: "할 일이 삭제되었습니다",
    purgedMany: (n: number) => `${n}개의 할 일이 삭제되었습니다`,
    purgedAll: (n: number) => `${n}개의 모든 보관 할 일이 삭제되었습니다`,
    restored: "할 일이 복구되었습니다",
  },
} as const
