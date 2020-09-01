import React, { useMemo } from 'react';

import {
  Container,
  ProfileContainer,
  Description,
  ScheduleContainer,
  ScheduleItem,
  Footer,
  Button,
} from './styles';
import convertMinutesToHours from '../../../utils/convertMinutesToHours';

export interface ClassData {
  class: {
    id: string;
    subject: string;
    cost: string;
    user: {
      name: string;
      bio: string;
      lastName: string;
      avatar_url: string;
      whatsapp: string;
    };
  };
  schedule: Array<{
    week_day: number;
    from: number;
    to: number;
  }>;
}

interface TeacherItemProps {
  classData: ClassData;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ classData }) => {
  const daysOfWeek = useMemo(() => {
    return [
      { day: 0, name: 'Domingo' },
      { day: 1, name: 'Segunda' },
      { day: 2, name: 'Terça' },
      { day: 3, name: 'Quarta' },
      { day: 4, name: 'Quinta' },
      { day: 5, name: 'Sexta' },
      { day: 6, name: 'Sábado' },
    ];
  }, []);

  return (
    <Container>
      <ProfileContainer>
        <img
          src={classData.class.user.avatar_url}
          alt={classData.class.user.name}
        />
        <div>
          <strong>
            {classData.class.user.name} {classData.class.user.lastName}
          </strong>
          <span>{classData.class.subject}</span>
        </div>
      </ProfileContainer>

      <Description>{classData.class.user.bio}</Description>

      <ScheduleContainer>
        {daysOfWeek.map(dayOfWeek => (
          <ScheduleItem disabled={false} key={dayOfWeek.name}>
            <span>Dia</span>
            <strong>{dayOfWeek.name}</strong>
            <span>Horário</span>
            <strong>
              {classData.schedule.find(
                scheduleItem => scheduleItem.week_day === dayOfWeek.day,
              )
                ? `${convertMinutesToHours(
                    classData.schedule.find(
                      scheduleItem => scheduleItem.week_day === dayOfWeek.day,
                    )?.from || 0,
                  )} - ${convertMinutesToHours(
                    classData.schedule.find(
                      scheduleItem => scheduleItem.week_day === dayOfWeek.day,
                    )?.to || 0,
                  )}`
                : '-'}
            </strong>
          </ScheduleItem>
        ))}
      </ScheduleContainer>

      <Footer>
        <div>
          <span>Preço/hora</span>
          <strong>{classData.class.cost}</strong>
        </div>

        <Button>
          <span>Entrar em contato</span>
        </Button>
      </Footer>
    </Container>
  );
};

export default TeacherItem;
