import React, { useCallback, useMemo } from 'react';

import {
  Container,
  ProfileContainer,
  Description,
  ScheduleContainer,
  ScheduleItem,
  Footer,
  Button,
} from './styles';
import weekDays from '../../../constants/weekDays';
import convertMinutesToHours from '../../../utils/convertMinutesToHours';
import api from '../../../services/api';
import subjects from '../../../constants/subjects';

export interface ClassData {
  id: string;
  subject: string;
  cost: string;
  formattedCost: string;
  user: {
    id: string;
    name: string;
    bio: string;
    lastName: string;
    avatar_url: string;
    whatsapp: string;
  };
  schedules: Array<{
    week_day: number;
    from: number;
    to: number;
  }>;
}

interface TeacherItemProps {
  classData: ClassData;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ classData }) => {
  const handleContact = useCallback(async () => {
    await api.post('/connections', {
      user_id: classData.user.id,
    });

    window.open(`https://wa.me/${classData.user.whatsapp}`, '_blank');
  }, [classData.user.id, classData.user.whatsapp]);

  const classSubject = useMemo(() => {
    return (
      subjects.find(subject => subject.value === classData.subject)?.label || ''
    );
  }, [classData]);

  return (
    <Container>
      <ProfileContainer>
        {classData.user.avatar_url ? (
          <img src={classData.user.avatar_url} alt={classData.user.name} />
        ) : (
          <img
            src="https://image.flaticon.com/icons/png/512/0/14.png"
            alt="Black circle"
          />
        )}
        <div>
          <strong>
            {classData.user.name} {classData.user.lastName}
          </strong>
          <span>{classSubject}</span>
        </div>
      </ProfileContainer>

      <Description>{classData.user.bio}</Description>

      <ScheduleContainer>
        {weekDays.map(weekDay => (
          <ScheduleItem disabled={false} key={weekDay.label}>
            <span>Dia</span>
            <strong>{weekDay.label}</strong>
            <span>Horário</span>
            <strong>
              {classData.schedules.find(
                schedulesItem => schedulesItem.week_day === weekDay.value,
              )
                ? `${convertMinutesToHours(
                    classData.schedules.find(
                      schedulesItem => schedulesItem.week_day === weekDay.value,
                    )!.from,
                  )} - ${convertMinutesToHours(
                    classData.schedules.find(
                      schedulesItem => schedulesItem.week_day === weekDay.value,
                    )!.to,
                  )}`
                : '-'}
            </strong>
          </ScheduleItem>
        ))}
      </ScheduleContainer>

      <Footer>
        <div>
          <span>Preço/hora</span>
          <strong>{classData.formattedCost}</strong>
        </div>

        <Button onClick={handleContact}>
          <span>Entrar em contato</span>
        </Button>
      </Footer>
    </Container>
  );
};

export default TeacherItem;
