import { PORT1 } from "@/api/config/servicePort"
import * as http from "@/api"

/**
 * @name 文件上传模块 FormData
 */
// 图片上传
export const uploadImg = (params) => {
  return http.post(PORT1 + `/file/upload/img`, params)
};

// 视频上传
export const uploadVideo = (params) => {
  return http.post(PORT1 + `/file/upload/video`, params)
};
