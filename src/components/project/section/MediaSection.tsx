import React from "react";
import styles from "../../../pages/projectCreate/ProjectCreate.module.css";

import {
  faCloudUploadAlt,
  faImages,
  faPlus,
  faPlusCircle,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MAX_MEDIA_FILES } from "../../../type/contants";

interface MediaSectionProps {
  thumbnailUrl: string | null; // null도 처리할 수 있게 변경
  mediaFiles: Array<{
    url: string | null;
    description: string;
  }>;
  onThumbnailUpload: (file: File) => void;
  onMediaUpload: (index: number, file: File) => void;
  onAddMedia: () => void;
  onDeleteMedia: (index: number) => void;
  onMediaDescriptionChange: (index: number, description: string) => void;
}

const MediaSection: React.FC<MediaSectionProps> = ({
  thumbnailUrl,
  mediaFiles = [],
  onThumbnailUpload,
  onMediaUpload,
  onAddMedia,
  onDeleteMedia,
  onMediaDescriptionChange,
}) => {
  return (
    <div className={styles.formSection}>
      <h2>
        <FontAwesomeIcon icon={faImages} /> 미디어
      </h2>

      <div className={styles.formGroup}>
        <label>썸네일 이미지 *</label>
        <div
          className={`${styles.fileUpload} `}
          onClick={() => document.getElementById("thumbnail-upload")?.click()}
        >
          {thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt="썸네일 미리보기"
              className={styles.imagePreview}
            />
          ) : (
            <>
              <FontAwesomeIcon
                icon={faCloudUploadAlt}
                className={styles.uploadIcon}
              />
              <p className={styles.uploadText}>
                가로형 이미지 권장 (16:9)
                <br />앱 아이콘 형태의 경우 정사각형 이미지 권장 (1:1)
              </p>
            </>
          )}
          <input
            type="file"
            id="thumbnail-upload"
            style={{ display: "none" }}
            onChange={(e) =>
              e.target.files?.[0] && onThumbnailUpload(e.target.files[0])
            }
            accept="image/*"
            // required
          />
        </div>
      </div>

      <div className={styles.formGroup}>
        <label>추가 이미지/동영상 (최대 {MAX_MEDIA_FILES}개)</label>
        <div className={styles.mediaTier}>
          <div className={styles.mediaTierHeader}>
            <h3 className={styles.mediaTierTitle}>프로젝트 설명 이미지</h3>
            <button
              type="button"
              className={styles.mediaAddButton}
              onClick={() => {
                console.log("추가 버튼 클릭"); // 디버깅용
                onAddMedia();
              }}
              disabled={mediaFiles.length >= MAX_MEDIA_FILES}
            >
              <FontAwesomeIcon icon={faPlus} /> 추가
            </button>
          </div>

          {mediaFiles.map((media, index) => (
            <div key={index} className={styles.mediaItem}>
              <div className={styles.mediaInputGroup}>
                <input
                  type="file"
                  id={`media-upload-${index}`}
                  style={{ display: "none" }}
                  onChange={(e) =>
                    e.target.files?.[0] &&
                    onMediaUpload(index, e.target.files[0])
                  }
                  accept="image/*,video/*"
                />

                <div className={styles.mediaUploadArea}>
                  {media.url ? (
                    <div className={styles.mediaPreview}>
                      <img
                        src={media.url}
                        alt={`미디어 ${index + 1}`}
                        className={styles.mediaImage}
                      />
                      {/* 삭제 버튼 위치 변경 (기존 위치 유지) */}
                      <button
                        type="button"
                        className={styles.mediaRemoveButton}
                        onClick={() => onDeleteMedia(index)}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} size="sm" />
                      </button>
                    </div>
                  ) : (
                    <label
                      htmlFor={`media-upload-${index}`}
                      className={styles.mediaUploadLabel}
                    >
                      <FontAwesomeIcon icon={faPlusCircle} />
                      <span>이미지 선택</span>
                    </label>
                  )}
                </div>

                <textarea
                  className={styles.mediaDescriptionInput}
                  placeholder="이미지 설명을 입력하세요"
                  value={media.description}
                  onChange={(e) =>
                    onMediaDescriptionChange(index, e.target.value)
                  }
                  rows={3}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MediaSection;
