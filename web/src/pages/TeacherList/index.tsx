import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { Container, HeaderContent, List } from './styles';
import CustomisableHeader from '../../components/organisms/CustomisableHeader';
import TeacherItem, { ClassData } from '../../components/organisms/TeacherItem';

const sampleClass: ClassData = {
  class: {
    cost: 'R$ 25',
    id: 'uuid',
    subject: 'Matemática',
    user: {
      bio: "I'm an art teacher",
      name: 'Tiago',
      lastName: 'Luchtenberg',
      whatsapp: '59907634853',
      avatar_url:
        'https://avatars3.githubusercontent.com/u/53716129?s=460&u=edacca5253ac7c836de527f0abd9d07c5bf72479&v=4',
    },
  },
  schedule: [
    {
      week_day: 1,
      from: 480,
      to: 720,
    },
    {
      week_day: 2,
      from: 480,
      to: 720,
    },
  ],
};

const TeacherList: React.FC = () => {
  const history = useHistory();

  const handleGoBack = useCallback(() => {
    history.push('/landing');
  }, [history]);

  return (
    <Container>
      <CustomisableHeader pageName="Estudar" handleGoBack={handleGoBack}>
        <HeaderContent>
          <h1>Estes são os proffys disponíveis</h1>
        </HeaderContent>
      </CustomisableHeader>
      <List>
        <TeacherItem classData={sampleClass} />
      </List>
    </Container>
  );
};

export default TeacherList;
