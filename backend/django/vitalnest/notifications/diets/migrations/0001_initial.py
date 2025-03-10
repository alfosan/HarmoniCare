# Generated by Django 4.2.18 on 2025-01-23 09:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('diets', '0001_initial'),
        ('user', '0001_initial'),
        ('userpatient', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='NotificationsDiets',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=255)),
                ('urgency', models.CharField(max_length=50)),
                ('description', models.CharField(max_length=255)),
                ('name', models.CharField(max_length=255)),
                ('isactive', models.IntegerField()),
                ('createdat', models.DateTimeField(auto_now_add=True)),
                ('updatedat', models.DateTimeField(auto_now=True)),
                ('isview', models.IntegerField()),
                ('id_diet', models.ForeignKey(blank=True, db_column='id_diet', null=True, on_delete=django.db.models.deletion.CASCADE, related_name='notifications', to='diets.diets')),
                ('id_patient', models.ForeignKey(blank=True, db_column='id_patient', null=True, on_delete=django.db.models.deletion.CASCADE, related_name='diet_notifications', to='userpatient.userpatient')),
                ('id_user', models.ForeignKey(blank=True, db_column='id_user', null=True, on_delete=django.db.models.deletion.CASCADE, related_name='diet_notifications', to='user.user')),
            ],
            options={
                'db_table': 'notificationsdiets',
            },
        ),
    ]
