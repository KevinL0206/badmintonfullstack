# Generated by Django 5.0.1 on 2024-01-28 11:11

import django.db.models.deletion
import mainapp.models
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="club",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("clubName", models.CharField(max_length=255)),
                (
                    "clubOrganiser",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="player",
            fields=[
                (
                    "playerName",
                    models.CharField(max_length=255, primary_key=True, serialize=False),
                ),
                ("win", models.IntegerField(default=0)),
                ("loss", models.IntegerField(default=0)),
                ("inGameFlag", models.BooleanField(default=False)),
                ("elo", models.IntegerField(default=1200)),
                (
                    "club",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="mainapp.club"
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="session",
            fields=[
                ("sessionID", models.AutoField(primary_key=True, serialize=False)),
                ("date", models.DateField(default=mainapp.models.get_today)),
                (
                    "club",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="mainapp.club"
                    ),
                ),
                ("players", models.ManyToManyField(to="mainapp.player")),
            ],
        ),
        migrations.CreateModel(
            name="match",
            fields=[
                ("matchID", models.AutoField(primary_key=True, serialize=False)),
                ("score", models.CharField(default="00-00", max_length=255)),
                ("completed", models.BooleanField(default=False)),
                (
                    "team1",
                    models.ManyToManyField(
                        blank=True, related_name="team1", to="mainapp.player"
                    ),
                ),
                (
                    "team2",
                    models.ManyToManyField(
                        blank=True, related_name="team2", to="mainapp.player"
                    ),
                ),
                (
                    "session",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="mainapp.session",
                    ),
                ),
            ],
        ),
        migrations.AddConstraint(
            model_name="club",
            constraint=models.UniqueConstraint(
                fields=("clubName", "clubOrganiser"), name="unique_club"
            ),
        ),
        migrations.AddConstraint(
            model_name="player",
            constraint=models.UniqueConstraint(
                fields=("playerName", "club"), name="unique_player"
            ),
        ),
        migrations.AddConstraint(
            model_name="session",
            constraint=models.UniqueConstraint(
                fields=("sessionID", "club"), name="unique_session"
            ),
        ),
        migrations.AddConstraint(
            model_name="session",
            constraint=models.UniqueConstraint(
                fields=("club", "date"), name="unique_club_date"
            ),
        ),
        migrations.AddConstraint(
            model_name="match",
            constraint=models.UniqueConstraint(
                fields=("matchID", "session"), name="unique_match"
            ),
        ),
    ]
