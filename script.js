const specialistsAppointmentDates = {
  1: [1, 2, 3],
  2: [4, 5],
  3: [1, 3, 5],
  4: [1, 4],
};

$(function () {
  let value = document.getElementById("hair-specialist").value;
  value = parseInt(value);

  $("#expirary-date").datepicker();

  $("#datepicker").datepicker({
    beforeShowDay: function (date) {
      if (value in specialistsAppointmentDates) {
        const availableDates = specialistsAppointmentDates[value];

        return [
          date.getDay() != 6 &&
            date.getDay() != 0 &&
            availableDates.some((d) => date.getDay() == d),
          "",
        ];
      } else {
        // Disable weekends (Saturday: 6, Sunday: 0)
        return [date.getDay() != 6 && date.getDay() != 0, ""];
      }
    },
  });

  document.getElementById("hair-specialist").onchange = () => {
    let value = document.getElementById("hair-specialist").value;
    value = parseInt(value);

    $("#datepicker").datepicker("destroy");
    $("#datepicker").datepicker({
      beforeShowDay: function (date) {
        if (value in specialistsAppointmentDates) {
          const availableDates = specialistsAppointmentDates[value];

          return [
            date.getDay() != 6 &&
              date.getDay() != 0 &&
              availableDates.some((d) => date.getDay() == d),
            "",
          ];
        } else {
          // Disable weekends (Saturday: 6, Sunday: 0)
          return [date.getDay() != 6 && date.getDay() != 0, ""];
        }
      },
    });
  };
});

function setProfessional(value) {
  value = parseInt(value);

  $("#datepicker").datepicker("destroy");
  $("#datepicker").datepicker({
    beforeShowDay: function (date) {
      if (value in specialistsAppointmentDates) {
        const availableDates = specialistsAppointmentDates[value];

        return [
          date.getDay() != 6 &&
            date.getDay() != 0 &&
            availableDates.some((d) => date.getDay() == d),
          "",
        ];
      } else {
        // Disable weekends (Saturday: 6, Sunday: 0)
        return [date.getDay() != 6 && date.getDay() != 0, ""];
      }
    },
  });

  document.getElementById("hair-specialist").value = `${value}`;
}

function setService(value) {
  value = parseInt(value);

  document.getElementById("service-select").value = `${value}`;
}
