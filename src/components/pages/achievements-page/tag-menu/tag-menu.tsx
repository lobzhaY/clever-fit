import { Tag } from 'antd';

import { useAppSelector } from '../../../../hooks';

import { TrainingListTagsText } from '../../../../constants';

import styles from './tag-menu.module.scss';

type TagMenuType = {
  selectedTags: TrainingListTagsText;
  setSelectedTags: (tags: TrainingListTagsText) => void;
};

export const TagMenuComponent: React.FC<TagMenuType> = ({ selectedTags, setSelectedTags }) => {
  const { trainingList } = useAppSelector((state) => state.userExercises);

  const tagsData = trainingList.length
    ? [TrainingListTagsText.All, ...trainingList.map((elem) => elem.name)]
    : [TrainingListTagsText.All];

  const handleChange = (tag: TrainingListTagsText) => {
    setSelectedTags(tag);
  };

  return (
    <div className={styles.tagsWrapper}>
      <span className={styles.tagsTitle}>Тип тренировки:</span>
      <div className={styles.tags}>
        {tagsData.map<React.ReactNode>((tag, index) => (
          <Tag.CheckableTag
            key={index}
            checked={selectedTags.includes(tag)}
            onChange={() => handleChange(tag as TrainingListTagsText)}>
            {tag}
          </Tag.CheckableTag>
        ))}
      </div>
    </div>
  );
};
